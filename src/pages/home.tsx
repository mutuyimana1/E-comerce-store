import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Check } from "lucide-react";
import type { Product, CategoryItem } from "../types";
import { fetchProducts, fetchCategories } from "../utils/api";
import ProductGrid from "../components/product/product-grid";
import CategoryCard from "../components/category/category-card";
import Loader from "../components/common/loader";
import ErrorState from "../components/common/error-state";
import {
  formatCurrency,
  calculateDiscountedPrice,
} from "../utils/format-currency";
import { useCart } from "../hooks/useCart";
import Landing from "../components/Landing";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"featured" | "new" | "sale">(
    "featured",
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const { addToCart, items } = useCart();

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [pRes, cRes] = await Promise.all([
        fetchProducts({ limit: 20 }),
        fetchCategories(),
      ]);
      setProducts(pRes.products);
      setCategories(cRes.slice(0, 6));
    } catch {
      setError("Unable to load storefront items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // if (loading) return <Loader fullScreen />;
  if (error) return <ErrorState message={error} onRetry={loadData} />;

  const heroProduct = products[0];
  const featuredItems = products.slice(1, 9);
  const newItems = [...products].sort((a, b) => b.id - a.id).slice(0, 8);
  const saleItems = products
    .filter((p) => p.discountPercentage > 10)
    .slice(0, 8);

  const currentGridItems =
    activeTab === "featured"
      ? featuredItems
      : activeTab === "new"
        ? newItems
        : saleItems;

  const heroInCart = heroProduct
    ? items.some((i) => i.product.id === heroProduct.id)
    : false;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="py-6 space-y-16">
      {/* <section className="py-8 sm:py-12 border-b border-zinc-100">
        <div className="max-w-3xl space-y-4">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-none uppercase">
            Quality Everyday Items.
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed max-w-xl">
            Products across electronics, personal accessories, and home goods.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="px-6 py-3 bg-black text-white text-xs font-semibold hover:bg-zinc-800 transition-colors inline-flex items-center gap-2"
            >
              Shop All Products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/categories"
              className="px-6 py-3 bg-zinc-100 text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section> */}
      <Landing />

      <section className="space-y-4">
        <div className="flex justify-between items-end border-b border-zinc-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-black uppercase tracking-wider">
              Categories
            </h2>
            <p className="text-[11px] text-zinc-400">Curated by category</p>
          </div>
          <Link
            to="/categories"
            className="text-xs font-medium text-black hover:underline"
          >
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>
      {loading ? (
        <Loader />
      ) : (
        <>
          {heroProduct && (
            <section className="bg-zinc-50 p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-block bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  Product Spotlight
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-black tracking-tight">
                  {heroProduct.title}
                </h2>
                <p className="text-xs text-zinc-600 leading-relaxed max-w-md">
                  {heroProduct.description}
                </p>

                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl font-black text-black">
                    {formatCurrency(
                      calculateDiscountedPrice(
                        heroProduct.price,
                        heroProduct.discountPercentage,
                      ),
                    )}
                  </span>
                  {heroProduct.discountPercentage > 0 && (
                    <span className="text-xs text-zinc-400 line-through">
                      {formatCurrency(heroProduct.price)}
                    </span>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => addToCart(heroProduct, 1)}
                    className={`px-6 py-2.5 text-xs font-semibold inline-flex items-center gap-2 transition-colors ${
                      heroInCart
                        ? "bg-zinc-200 text-black"
                        : "bg-black text-white hover:bg-zinc-800"
                    }`}
                  >
                    {heroInCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                      </>
                    )}
                  </button>
                  <Link
                    to={`/products/${heroProduct.id}`}
                    className="px-5 py-2.5 bg-white text-black text-xs font-semibold hover:bg-zinc-100 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <Link
                to={`/products/${heroProduct.id}`}
                className="block bg-white aspect-square p-6 overflow-hidden"
              >
                <img
                  src={heroProduct.thumbnail}
                  alt={heroProduct.title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </section>
          )}

          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-3">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setActiveTab("featured")}
                  className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors ${
                    activeTab === "featured"
                      ? "text-black border-b-2 border-black"
                      : "text-zinc-400 hover:text-black"
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setActiveTab("new")}
                  className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors ${
                    activeTab === "new"
                      ? "text-black border-b-2 border-black"
                      : "text-zinc-400 hover:text-black"
                  }`}
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => setActiveTab("sale")}
                  className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors ${
                    activeTab === "sale"
                      ? "text-black border-b-2 border-black"
                      : "text-zinc-400 hover:text-black"
                  }`}
                >
                  On Sale
                </button>
              </div>

              <Link
                to="/products"
                className="text-xs font-medium text-black hover:underline"
              >
                View All Products →
              </Link>
            </div>

            <ProductGrid products={currentGridItems} />
          </section>
        </>
      )}
      <section className="bg-zinc-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-md space-y-2">
          <h3 className="text-lg font-bold uppercase tracking-tight">
            Stay Connected
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Subscribe to receive updates on new products and sales.
          </p>
        </div>

        {subscribed ? (
          <p className="text-xs font-semibold text-white bg-zinc-800 px-4 py-2">
            ✓ You have been subscribed.
          </p>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex w-full md:w-auto gap-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2.5 bg-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
