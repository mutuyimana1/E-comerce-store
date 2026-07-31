import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="py-8 max-w-2xl mx-auto space-y-6 text-xs text-zinc-600">
      <div className="border-b border-zinc-200 pb-3">
        <h1 className="text-xl font-bold text-black">About STUDIO.</h1>
      </div>

      <p className="leading-relaxed">
        STUDIO is a minimalist online store focused on essential products across electronics, fashion, and home accessories.
      </p>

      <p className="leading-relaxed">
        We prioritize clear pricing, simple design, fast shipping, and zero clutter.
      </p>

      <div>
        <Link to="/products" className="inline-block px-4 py-2 bg-black text-white text-xs font-medium">
          Browse Shop
        </Link>
      </div>
    </div>
  );
}
