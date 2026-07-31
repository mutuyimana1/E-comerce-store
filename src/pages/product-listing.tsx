import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product, CategoryItem } from "../types";
import { fetchProducts, fetchCategories } from "../utils/api";
import ProductGrid from "../components/product/product-grid";
import SearchBar from "../components/search/search-bar";
import SortDropdown from "../components/search/sort-dropdown";
import Pagination from "../components/common/pagination";
import Loader from "../components/common/loader";
import ErrorState from "../components/common/error-state";
import EmptyState from "../components/common/empty-state";
import { useDebounce } from "../hooks/useDebounce";

const LIMIT = 12;

export default function ProductListing() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const queryParam = params.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const debouncedSearch = useDebounce(searchTerm, 350);

  const selectedCat = params.get("category") || "";
  const page = parseInt(params.get("page") || "1", 10);
  const sortBy = params.get("sortBy") || "";
  const order = (params.get("order") as "asc" | "desc") || undefined;

  useEffect(() => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      if (debouncedSearch) p.set("search", debouncedSearch);
      else p.delete("search");
      p.set("page", "1");
      return p;
    });
  }, [debouncedSearch, setParams]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * LIMIT;
      const res = await fetchProducts({
        limit: LIMIT,
        skip,
        q: queryParam,
        category: selectedCat,
        sortBy,
        order,
      });
      setProducts(res.products);
      setTotal(res.total);
    } catch {
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, queryParam, selectedCat, sortBy, order]);

  const handleCategoryChange = (slug: string) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      if (slug) p.set("category", slug);
      else p.delete("category");
      p.set("page", "1");
      return p;
    });
  };

  const handleSortChange = (newSortBy: string, newOrder?: "asc" | "desc") => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      if (newSortBy) {
        p.set("sortBy", newSortBy);
        if (newOrder) p.set("order", newOrder);
      } else {
        p.delete("sortBy");
        p.delete("order");
      }
      p.set("page", "1");
      return p;
    });
  };

  const totalPages = Math.ceil(total / LIMIT);
  const currentSortId = sortBy ? `${sortBy}-${order || "asc"}` : "default";

  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-black capitalize">
            {selectedCat ? selectedCat.replace(/-/g, " ") : "All Products"}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">{total} items available</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCat}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-2.5 py-2 bg-white border border-zinc-200 text-xs font-medium text-zinc-800 capitalize focus:outline-none focus:border-black"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <SortDropdown currentSort={currentSortId} onSortChange={handleSortChange} />
        </div>
      </div>

      <div className="max-w-xs">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Filter catalog..."
          onClear={() => setSearchTerm("")}
        />
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} onRetry={loadData} />
      ) : products.length === 0 ? (
        <EmptyState
          onAction={() => {
            setSearchTerm("");
            setParams(new URLSearchParams());
          }}
        />
      ) : (
        <>
          <ProductGrid products={products} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => {
              setParams((prev) => {
                const updated = new URLSearchParams(prev);
                updated.set("page", p.toString());
                return updated;
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </div>
  );
}
