import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Loader2 } from "lucide-react";
import type { Product } from "../../types";
import { fetchProducts } from "../../utils/api";
import { useDebounce } from "../../hooks/useDebounce";
import { formatCurrency, calculateDiscountedPrice } from "../../utils/format-currency";

export default function NavSearch() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedTerm = useDebounce(term, 300);

  useEffect(() => {
    if (!debouncedTerm.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    fetchProducts({ q: debouncedTerm.trim(), limit: 5 })
      .then((res) => {
        setResults(res.products);
        setShowDropdown(true);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debouncedTerm]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && term.trim()) {
      setShowDropdown(false);
      navigate(`/products?search=${encodeURIComponent(term.trim())}`);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const handleSelectProduct = (productId: number) => {
    setShowDropdown(false);
    setTerm("");
    navigate(`/products/${productId}`);
  };

  const handleViewAll = () => {
    setShowDropdown(false);
    navigate(`/products?search=${encodeURIComponent(term.trim())}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setShowDropdown(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="w-full pl-8 pr-7 py-1.5 bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
        />

        {loading ? (
          <Loader2 className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 animate-spin" />
        ) : term ? (
          <button
            onClick={() => {
              setTerm("");
              setResults([]);
              setShowDropdown(false);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 z-50 divide-y divide-zinc-100">
          <div className="px-3 py-1.5 bg-zinc-50 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Recommendations
          </div>

          {results.length === 0 ? (
            <div className="p-3 text-xs text-zinc-400 text-center">
              No recommendations found
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {results.map((p) => {
                const finalPrice = calculateDiscountedPrice(p.price, p.discountPercentage);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="p-2.5 flex items-center gap-3 hover:bg-zinc-50 cursor-pointer transition-colors"
                  >
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="w-10 h-10 object-contain bg-zinc-50 p-0.5 border border-zinc-100 flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0 text-xs">
                      <p className="font-semibold text-zinc-900 truncate">{p.title}</p>
                      <p className="text-[10px] text-zinc-400 capitalize">{p.category}</p>
                    </div>
                    <span className="text-xs font-bold text-black flex-shrink-0">
                      {formatCurrency(finalPrice)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {results.length > 0 && (
            <button
              onClick={handleViewAll}
              className="w-full py-2 text-center text-xs font-semibold text-black bg-zinc-50 hover:bg-zinc-100 transition-colors"
            >
              See all results for "{term}" →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
