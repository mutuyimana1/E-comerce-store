import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Product, CategoryItem } from "../types";
import { fetchProducts, fetchCategories } from "../utils/api";
import ProductGrid from "../components/product/product-grid";
import CategoryCard from "../components/category/category-card";
import Loader from "../components/common/loader";
import ErrorState from "../components/common/error-state";

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [pRes, cRes] = await Promise.all([
        fetchProducts({ limit: 8 }),
        fetchCategories(),
      ]);
      setFeatured(pRes.products);
      setCategories(cRes.slice(0, 8));
    } catch {
      setError("Failed to load storefront data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="py-8 space-y-12">
      <section className="bg-zinc-900 text-white p-8 sm:p-12 border border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="max-w-md space-y-3">
          <span className="text-xs text-zinc-400 font-medium">New Season</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Minimal Essentials
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Everyday goods across electronics, accessories, and home items.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-semibold hover:bg-zinc-100 transition-colors"
            >
              Explore Shop <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="border border-zinc-800 p-5 bg-zinc-950 text-xs space-y-2 w-full sm:w-64">
          <span className="text-zinc-400 font-semibold block">Store Guarantee</span>
          <p className="text-zinc-300">Free shipping on orders over $100 and hassle-free returns within 30 days.</p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
          <h2 className="text-sm font-bold text-black uppercase tracking-wider">Categories</h2>
          <Link to="/categories" className="text-xs text-zinc-500 hover:text-black">
            View all →
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
          <h2 className="text-sm font-bold text-black uppercase tracking-wider">Featured Products</h2>
          <Link to="/products" className="text-xs text-zinc-500 hover:text-black">
            Full Catalog →
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorState message={error} onRetry={loadData} />
        ) : (
          <ProductGrid products={featured} />
        )}
      </section>
    </div>
  );
}
