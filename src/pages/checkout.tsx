import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/format-currency";

export default function Checkout() {
  const { items, getSubtotal, clearCart } = useCart();
  const subtotal = getSubtotal();
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    city: "New York",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="py-12 max-w-sm mx-auto text-center space-y-4 border border-zinc-200 p-6 my-8">
        <h1 className="text-lg font-bold text-black">Order Placed</h1>
        <p className="text-xs text-zinc-500">
          Thank you, {form.name}. A confirmation has been sent to {form.email}.
        </p>
        <Link to="/products" className="inline-block px-4 py-2 bg-black text-white text-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-12 text-center text-xs text-zinc-500">
        Your cart is empty. <Link to="/products" className="text-black underline">Add products</Link> to checkout.
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6">
      <h1 className="text-xl font-bold text-black border-b border-zinc-200 pb-3">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 border border-zinc-200 bg-white p-5 space-y-4 text-xs">
          <h2 className="font-bold text-black border-b border-zinc-200 pb-2">Shipping Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-600 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 border border-zinc-200"
              />
            </div>
            <div>
              <label className="block text-zinc-600 mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-2 border border-zinc-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-600 mb-1">Address</label>
            <input
              type="text"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-2 border border-zinc-200"
            />
          </div>

          <div>
            <label className="block text-zinc-600 mb-1">City</label>
            <input
              type="text"
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full p-2 border border-zinc-200"
            />
          </div>
        </div>

        <div className="border border-zinc-200 bg-white p-5 space-y-3 text-xs">
          <h2 className="font-bold text-black border-b border-zinc-200 pb-2">Order Review</h2>
          <div className="space-y-1 text-zinc-600">
            {items.map((i) => (
              <div key={i.product.id} className="flex justify-between">
                <span className="truncate max-w-[150px]">{i.product.title}</span>
                <span>x{i.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-200 space-y-1 font-semibold text-black">
            <div className="flex justify-between text-sm">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <button type="submit" className="w-full py-2.5 bg-black text-white text-xs font-semibold hover:bg-zinc-800">
            Place Order ({formatCurrency(total)})
          </button>
        </div>
      </form>
    </div>
  );
}
