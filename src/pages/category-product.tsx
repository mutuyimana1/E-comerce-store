import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { Product } from "../types";
import { fetchProducts } from "../utils/api";
import ProductGrid from "../components/product/product-grid";
import SortDropdown from "../components/search/sort-dropdown";
import Loader from "../components/common/loader";
import ErrorState from "../components/common/error-state";

export default function CategoryProducts() {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState<"asc" | "desc" | undefined>();

  const categorySlug = id || "";

  const loadData = async () => {
    if (!categorySlug) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProducts({
        category: categorySlug,
        sortBy,
        order,
        limit: 50,
      });
      setProducts(res.products);
    } catch {
      setError("Unable to load category products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
  }, [categorySlug, sortBy, order]);

  const currentSortId = sortBy ? `${sortBy}-${order || "asc"}` : "default";

  return (
    <div className="py-6 space-y-6">
      <Link
        to="/categories"
        className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-black"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> All Categories
      </Link>

      <div className="flex justify-between items-end border-b border-zinc-200 pb-3">
        <div></div>
        <SortDropdown
          currentSort={currentSortId}
          onSortChange={(s, o) => {
            setSortBy(s);
            setOrder(o);
          }}
        />
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} onRetry={loadData} />
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
