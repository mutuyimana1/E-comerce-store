import { useEffect, useState } from "react";
import type { CategoryItem } from "../types";
import { fetchCategories } from "../utils/api";
import CategoryCard from "../components/category/category-card";
import SearchBar from "../components/search/search-bar";
import Loader from "../components/common/loader";
import ErrorState from "../components/common/error-state";

export default function Categories() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setError("Failed to load categories."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-black">Categories</h1>
          <p className="text-xs text-zinc-500 mt-0.5">{categories.length} categories available</p>
        </div>

        <div className="w-full sm:w-64">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search categories..."
            onClear={() => setSearch("")}
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} />
      ) : filtered.length === 0 ? (
        <div className="border border-zinc-200 p-8 text-center bg-white">
          <p className="text-xs text-zinc-500">No categories found matching "{search}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      )}
    </div>
  );
}
