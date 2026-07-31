import { Link } from "react-router-dom";
import type { CategoryItem } from "../../types";

export default function CategoryCard({ category }: { category: CategoryItem }) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group block text-center"
    >
      <div className="aspect-[4/3] bg-zinc-50 overflow-hidden flex items-center justify-center p-3 mb-2">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        ) : (
          <div className="w-8 h-8 bg-zinc-200 text-zinc-600 flex items-center justify-center font-bold text-xs">
            {category.name.charAt(0)}
          </div>
        )}
      </div>

      <h3 className="text-xs font-semibold text-zinc-900 capitalize group-hover:underline">
        {category.name}
      </h3>
    </Link>
  );
}
