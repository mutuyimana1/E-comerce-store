import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 mt-20 text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-black text-sm tracking-tight uppercase">ECOMMERCE.</span>
        </div>

        <div className="flex gap-6">
          <Link to="/products" className="hover:text-black transition-colors">Catalog</Link>
          <Link to="/categories" className="hover:text-black transition-colors">Categories</Link>
          <Link to="/cart" className="hover:text-black transition-colors">Cart</Link>
          <Link to="/about" className="hover:text-black transition-colors">About</Link>
        </div>

        <p className="text-zinc-400">© {new Date().getFullYear()} ECOMMERCE.</p>
      </div>
    </footer>
  );
}
