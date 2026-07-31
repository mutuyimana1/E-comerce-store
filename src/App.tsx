import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Category from "./pages/categories";
import CategoryProducts from "./pages/category-product";
import ProductListing from "./pages/product-listing";
import ProductDetails from "./pages/product-detail";
import Checkout from "./pages/checkout";
import About from "./pages/about";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/categories/:id" element={<CategoryProducts />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
