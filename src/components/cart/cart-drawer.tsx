import { Link } from "react-router-dom";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import CartItem from "./cart-item";
import { formatCurrency } from "../../utils/format-currency";

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, getSubtotal, getTotalItems } = useCart();

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const count = getTotalItems();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/30" onClick={closeCart} />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-xs sm:max-w-sm bg-white border-l border-zinc-200 flex flex-col justify-between">
          <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
            <span className="text-xs font-bold text-black uppercase tracking-wider">Cart ({count})</span>
            <button onClick={closeCart} className="text-zinc-500 hover:text-black">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="py-12 text-center text-xs text-zinc-400 space-y-3">
                <ShoppingBag className="w-6 h-6 mx-auto opacity-40" />
                <p>Your bag is empty.</p>
              </div>
            ) : (
              items.map((item) => <CartItem key={item.product.id} item={item} />)
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t border-zinc-200 space-y-3 text-xs">
              <div className="flex justify-between font-bold text-black">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="py-2 text-center border border-black text-black font-medium hover:bg-zinc-50"
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="py-2 text-center bg-black text-white font-medium hover:bg-zinc-800"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
