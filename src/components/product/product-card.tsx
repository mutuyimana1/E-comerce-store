import type React from "react";
import { Link } from "react-router-dom";
import { Star, Check } from "lucide-react";
import type { Product } from "../../types";
import { formatCurrency, calculateDiscountedPrice } from "../../utils/format-currency";
import { useCart } from "../../hooks/useCart";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, items } = useCart();
  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
  const inCart = items.some((i) => i.product.id === product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="group border border-zinc-200 bg-white flex flex-col justify-between hover:border-black transition-colors">
      <Link to={`/products/${product.id}`} className="block relative bg-zinc-50 border-b border-zinc-200 aspect-square p-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-200"
          loading="lazy"
        />

        {product.discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-medium px-1.5 py-0.5">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </Link>

      <div className="p-3.5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
            <span className="capitalize">{product.category}</span>
            <div className="flex items-center gap-0.5 text-zinc-700">
              <Star className="w-3 h-3 fill-black text-black" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <Link to={`/products/${product.id}`} className="block text-xs font-semibold text-zinc-900 line-clamp-1 mb-1 hover:underline">
            {product.title}
          </Link>
        </div>

        <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-bold text-black">{formatCurrency(discountedPrice)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-[10px] text-zinc-400 line-through">{formatCurrency(product.price)}</span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`text-xs px-2.5 py-1 font-medium border transition-colors ${
              inCart ? "bg-zinc-100 border-zinc-300 text-black" : "bg-black text-white border-black hover:bg-zinc-800"
            }`}
          >
            {inCart ? <Check className="w-3.5 h-3.5 inline" /> : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
