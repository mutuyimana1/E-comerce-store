import { Link } from "react-router-dom";
import { Plus, Minus, X } from "lucide-react";
import type { CartItemType } from "../../types";
import { formatCurrency, calculateDiscountedPrice } from "../../utils/format-currency";
import { useCart } from "../../hooks/useCart";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();
  const product = item.product;
  const unitPrice = calculateDiscountedPrice(product.price, product.discountPercentage);

  return (
    <div className="flex gap-3 py-3 border-b border-zinc-200 bg-white">
      <Link to={`/products/${product.id}`} className="w-16 h-16 bg-zinc-50 border border-zinc-200 flex-shrink-0 p-1">
        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain" />
      </Link>

      <div className="flex-grow flex flex-col justify-between text-xs">
        <div className="flex justify-between items-start gap-2">
          <Link to={`/products/${product.id}`} className="font-medium text-zinc-900 line-clamp-1 hover:underline">
            {product.title}
          </Link>
          <button onClick={() => removeFromCart(product.id)} className="text-zinc-400 hover:text-black">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-zinc-200">
            <button
              onClick={() => updateQuantity(product.id, item.quantity - 1)}
              className="px-1.5 py-0.5 text-zinc-500 hover:bg-zinc-100"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-zinc-900 font-semibold">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, item.quantity + 1)}
              className="px-1.5 py-0.5 text-zinc-500 hover:bg-zinc-100"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <span className="font-bold text-black">{formatCurrency(unitPrice * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
