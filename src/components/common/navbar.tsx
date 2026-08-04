import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import NavSearch from "./nav-search";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCart();
  const itemCount = getTotalItems();

  const links = [
    { label: "Shop", path: "/products" },
    { label: "Categories", path: "/categories" },
    { label: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 gap-4">
        <Link to="/" className="font-bold text-base tracking-tight text-zinc-900 uppercase flex-shrink-0">
          E-Store.
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-xs tracking-wide transition-colors ${
                  isActive ? "text-black font-semibold border-b border-black py-4" : "text-zinc-500 hover:text-black"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden sm:block flex-grow max-w-xs mx-4">
          <NavSearch />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleCart}
            className="relative p-1.5 text-zinc-700 hover:text-black transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-zinc-700"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-3 space-y-3">
          <div className="pt-1 pb-2">
            <NavSearch />
          </div>

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-xs font-medium py-1.5 ${isActive ? "text-black font-semibold" : "text-zinc-600"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
