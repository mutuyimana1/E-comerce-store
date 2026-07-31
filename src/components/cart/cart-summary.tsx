import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/format-currency";

export default function CartSummary() {
  const { getSubtotal, getTotalItems } = useCart();
  const subtotal = getSubtotal();
  const count = getTotalItems();

  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="border border-zinc-200 bg-white p-5 space-y-4 text-xs">
      <h3 className="font-bold text-black border-b border-zinc-200 pb-2">Order Summary</h3>

      <div className="space-y-2 text-zinc-600">
        <div className="flex justify-between">
          <span>Items ({count})</span>
          <span className="text-zinc-900 font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-zinc-900 font-medium">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>Est. Tax</span>
          <span className="text-zinc-900 font-medium">{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between font-bold text-black text-sm pt-2 border-t border-zinc-200">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className={`block w-full text-center py-2.5 bg-black text-white text-xs font-semibold hover:bg-zinc-800 transition-colors ${
          count === 0 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        Checkout
      </Link>
    </div>
  );
}
