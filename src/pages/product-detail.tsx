import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Plus, Minus, Check, ArrowLeft } from "lucide-react";
import type { Product } from "../types";
import { fetchProductById } from "../utils/api";
import { formatCurrency, calculateDiscountedPrice } from "../utils/format-currency";
import { useCart } from "../hooks/useCart";
import ProductImageGallery from "../components/product/product-image-gallery";
import ProductReview from "../components/product/product-review";
import RelatedProduct from "../components/product/related-product";
import Loader from "../components/common/loader";
import ErrorState from "../components/common/error-state";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, items } = useCart();

  const loadProduct = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch {
      setError("Product could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <Loader fullScreen />;
  if (error || !product) return <ErrorState message={error || "Product not found"} onRetry={loadProduct} />;

  const price = calculateDiscountedPrice(product.price, product.discountPercentage);
  const inCart = items.some((i) => i.product.id === product.id);

  return (
    <div className="py-6 space-y-10">
      <Link to="/products" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-black">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <ProductImageGallery images={product.images} title={product.title} />

        <div className="space-y-5 bg-white">
          <div>
            <span className="text-[11px] text-zinc-400 font-semibold uppercase">{product.brand || product.category}</span>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-0.5">{product.title}</h1>
            <div className="flex items-center gap-1 text-xs text-zinc-600 mt-2">
              <Star className="w-3.5 h-3.5 fill-black text-black" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-zinc-400">({product.reviews?.length || 0} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-black">{formatCurrency(price)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-zinc-400 line-through">{formatCurrency(product.price)}</span>
            )}
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed">{product.description}</p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 font-medium">Quantity:</span>
              <div className="flex items-center border border-zinc-200">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-2 py-1 text-zinc-600 hover:bg-zinc-100">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-3 text-xs font-bold text-black">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-2 py-1 text-zinc-600 hover:bg-zinc-100">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <button
              onClick={() => addToCart(product, qty)}
              className="w-full py-2.5 bg-black text-white text-xs font-semibold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5"
            >
              {inCart ? <Check className="w-4 h-4" /> : null}
              {inCart ? "In Cart (Add More)" : "Add to Cart"}
            </button>
          </div>

          <div className="border-t border-zinc-200 pt-4 text-xs text-zinc-500 space-y-1">
            {product.warrantyInformation && <p>Warranty: {product.warrantyInformation}</p>}
            {product.shippingInformation && <p>Shipping: {product.shippingInformation}</p>}
            {product.returnPolicy && <p>Returns: {product.returnPolicy}</p>}
          </div>
        </div>
      </div>

      <ProductReview reviews={product.reviews} />
      <RelatedProduct category={product.category} currentProductId={product.id} />
    </div>
  );
}
