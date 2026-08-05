import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Check } from "lucide-react";
import type { Product } from "../../types";
import { formatCurrency, calculateDiscountedPrice } from "../../utils/format-currency";
import { useCart } from "../../hooks/useCart";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, items } = useCart();
  const [isLoaded, setIsLoaded] = useState(false); // Tracks image download completion
  
  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
  const inCart = items.some((i) => i.product.id === product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="group flex flex-col justify-between h-full bg-white">
      <Link to={`/products/${product.id}`} className="block relative bg-zinc-50 aspect-square p-4 overflow-hidden rounded-md">
        
        {/* SKELETON PLACEHOLDER: Shows only while isLoaded is false */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-zinc-100 animate-pulse flex items-center justify-center">
            {/* Minimalist central icon indicator */}
            <div className="w-10 h-10 rounded bg-zinc-200/60" />
          </div>
        )}

        {/* IMAGE COMPONENT: Fades in elegantly once loaded */}
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-contain group-hover:scale-105 transition-all duration-500 ease-out ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm z-10">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </Link>

      <div className="pt-3 flex flex-col justify-between flex-grow">
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

        <div className="mt-2 pt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-bold text-black">{formatCurrency(discountedPrice)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-[10px] text-zinc-400 line-through">{formatCurrency(product.price)}</span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`text-xs px-3 py-1 font-medium transition-colors rounded-md flex items-center justify-center min-w-[60px] ${
              inCart ? "bg-zinc-100 text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"
            }`}
          >
            {inCart ? <Check className="w-3.5 h-3.5" /> : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
