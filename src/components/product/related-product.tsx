import { useEffect, useState } from "react";
import type { Product } from "../../types";
import { fetchProducts } from "../../utils/api";
import ProductGrid from "./product-grid";

export default function RelatedProduct({ category, currentProductId }: { category: string; currentProductId: number }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    if (!category) return;
    fetchProducts({ category, limit: 5 })
      .then((res) => {
        setItems(res.products.filter((p) => p.id !== currentProductId).slice(0, 4));
      })
      .catch(() => {});
  }, [category, currentProductId]);

  if (items.length === 0) return null;

  return (
    <div className="pt-10 border-t border-zinc-200 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-black">Related Items</h3>
      <ProductGrid products={items} />
    </div>
  );
}
