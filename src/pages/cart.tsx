import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/cart/cart-item";
import CartSummary from "../components/cart/cart-summary";

export default function Cart() {
  const { items, clearCart, getTotalItems } = useCart();
  const count = getTotalItems();

  return (
    <div className="py-6 space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
        <h1 className="text-xl font-bold text-black">Shopping Cart ({count})</h1>
        {items.length > 0 && (
          <button onClick={clearCart} className="text-xs text-zinc-500 hover:text-black">
            Clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-white border border-zinc-200">
          <p className="text-xs text-zinc-500">Your cart is empty.</p>
          <Link to="/products" className="inline-block px-4 py-2 bg-black text-white text-xs font-medium">
            Shop Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 divide-y divide-zinc-200 border-t border-b border-zinc-200">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
