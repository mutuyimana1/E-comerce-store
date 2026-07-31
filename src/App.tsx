import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";
import CartDrawer from "./components/cart/cart-drawer";

import Home from "./pages/home";
import ProductListing from "./pages/product-listing";
import ProductDetails from "./pages/product-detail";
import Categories from "./pages/categories";
import CategoryProducts from "./pages/category-product";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import About from "./pages/about";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans antialiased selection:bg-black selection:text-white">
      <Navbar />

      <CartDrawer />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoryProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
