import { Link } from "react-router-dom";
import type { CategoryItem } from "../../types";

export default function CategoryCard({ category }: { category: CategoryItem }) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="block border border-zinc-200 bg-white p-5 hover:border-black transition-colors"
    >
      <h3 className="text-xs font-bold text-zinc-900 capitalize mb-1">{category.name}</h3>
      <p className="text-[11px] text-zinc-400">Browse collection →</p>
    </Link>
  );
}
