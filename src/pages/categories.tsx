import { useEffect, useState } from "react";
import type { CategoryItem } from "../types";
import { fetchCategories } from "../utils/api";
import CategoryCard from "../components/category/category-card";
import Loader from "../components/common/loader";
import ErrorState from "../components/common/error-state";

export default function Categories() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setError("Failed to load categories."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-6 space-y-6">
      <div className="border-b border-zinc-200 pb-3">
        <h1 className="text-xl font-bold text-black">Categories</h1>
        <p className="text-xs text-zinc-500 mt-0.5">Explore by department</p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      )}
    </div>
  );
}
