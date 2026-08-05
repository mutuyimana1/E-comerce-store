import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
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

const INITIAL_LIMIT = 12;
const INITIAL_CATEGORY_COUNT = 6;

const LIMIT_OPTIONS = [12, 24, 50];

export default function ProductListing() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const queryParam = params.get("search") || "";
  const selectedCat = params.get("category") || "";
  const sortBy = params.get("sortBy") || "";
  const order = (params.get("order") as "asc" | "desc") || undefined;
  const limit = parseInt(params.get("limit") || String(INITIAL_LIMIT), 10) || INITIAL_LIMIT;
  
  const page = parseInt(params.get("page") || "1", 10) || 1;
console.log(products,"products")
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const debouncedSearch = useDebounce(searchTerm, 350);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  useEffect(() => {
    
    if (debouncedSearch !== queryParam) {
      setParams((prev) => {
        const p = new URLSearchParams(prev);
        if (debouncedSearch.trim()) {
          p.set("search", debouncedSearch.trim());
        } else {
          p.delete("search");
        }
        p.set("page", "1"); 
        return p;
      });
    }
  }, [debouncedSearch, setParams, queryParam]);

  // CATEGORIES FETCH 
  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
     
      const skip = (page - 1) * limit;
      const res = await fetchProducts({
        limit,
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
  }, [page, limit, queryParam, selectedCat, sortBy, order]);


  const handleCategoryToggle = (slug: string) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      if (selectedCat === slug) {
        p.delete("category");
      } else {
        p.set("category", slug);
      }
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

  const handleLimitChange = (newLimit: number) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("limit", String(newLimit));
      p.set("page", "1");
      return p;
    });
  };

  const resetAllFilters = () => {
    setSearchTerm("");
    setParams(new URLSearchParams());
    setMobileFilterOpen(false);
  };

  const totalPages = Math.ceil(total / limit);
  const currentSortId = sortBy ? `${sortBy}-${order || "asc"}` : "default";
  const hasActiveFilters = Boolean(selectedCat || queryParam || sortBy);

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, INITIAL_CATEGORY_COUNT);

  const FilterContent = (
    <div className="space-y-6 text-xs">
      <div>
        <h3 className="font-bold text-black uppercase tracking-wider mb-2">Search</h3>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search products..."
          onClear={() => setSearchTerm("")}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-black uppercase tracking-wider">Categories</h3>
          {selectedCat && (
            <button
              onClick={() => handleCategoryToggle(selectedCat)}
              className="text-[10px] text-zinc-400 hover:text-black"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-2">
          {visibleCategories.map((c) => {
            const isChecked = selectedCat === c.slug;
            return (
              <label
                key={c.slug}
                className="flex items-center gap-2.5 cursor-pointer text-zinc-700 hover:text-black py-0.5 select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCategoryToggle(c.slug)}
                  className="w-3.5 h-3.5 border-zinc-300 text-black focus:ring-0 accent-black cursor-pointer"
                />
                <span className={`capitalize ${isChecked ? "font-bold text-black" : "font-normal"}`}>
                  {c.name}
                </span>
              </label>
            );
          })}
        </div>

        {categories.length > INITIAL_CATEGORY_COUNT && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="mt-3 text-xs font-semibold text-black hover:underline flex items-center gap-1"
          >
            {showAllCategories ? (
              <>
                Show less <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                View all categories ({categories.length}) <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}
      </div>

      <div>
        <h3 className="font-bold text-black uppercase tracking-wider mb-2">Sort By</h3>
        <SortDropdown currentSort={currentSortId} onSortChange={handleSortChange} />
      </div>

      {hasActiveFilters && (
        <button
          onClick={resetAllFilters}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="py-6 space-y-6">
      <div className="flex justify-between items-end pb-4">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 text-xs font-medium"
        >
          <Filter className="w-3.5 h-3.5" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="hidden lg:block lg:col-span-1 sticky top-20 space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
          {FilterContent}
        </aside>

        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilterOpen(false)} />
            <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white p-5 overflow-y-auto space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                <span className="font-bold text-xs uppercase text-black">Filter & Sort</span>
                <button onClick={() => setMobileFilterOpen(false)} className="text-zinc-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {FilterContent}
            </div>
          </div>
        )}

        <main className="lg:col-span-3 space-y-6">
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorState message={error} onRetry={loadData} />
          ) : products.length === 0 ? (
            <EmptyState onAction={resetAllFilters} />
          ) : (
            <>
              <ProductGrid products={products} />
               <div className="flex items-center justify-between">
               
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
                <div className="flex items-center gap-2">
                  <label htmlFor="limit-select" className="text-xs text-zinc-500">
                    Per page:
                  </label>
                  <select
                    id="limit-select"
                    value={limit}
                    onChange={(e) => handleLimitChange(parseInt(e.target.value, 10))}
                    className="text-xs border border-zinc-200 bg-white px-2 py-1 text-zinc-700 focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    {LIMIT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
