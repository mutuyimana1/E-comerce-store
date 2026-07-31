import type React from "react";

interface SortProps {
  currentSort: string;
  onSortChange: (sortBy: string, order?: "asc" | "desc") => void;
}

const OPTIONS: { id: string; label: string; sortBy: string; order?: "asc" | "desc" }[] = [
  { id: "default", label: "Recommended", sortBy: "", order: undefined },
  { id: "price-asc", label: "Price: Low to High", sortBy: "price", order: "asc" },
  { id: "price-desc", label: "Price: High to Low", sortBy: "price", order: "desc" },
  { id: "rating-desc", label: "Highest Rated", sortBy: "rating", order: "desc" },
  { id: "title-asc", label: "Name: A–Z", sortBy: "title", order: "asc" },
];

export default function SortDropdown({ currentSort, onSortChange }: SortProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const item = OPTIONS.find((o) => o.id === e.target.value);
    if (item) onSortChange(item.sortBy, item.order);
  };

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      className="px-2.5 py-2 bg-white border border-zinc-200 text-xs font-medium text-zinc-800 focus:outline-none focus:border-black"
    >
      {OPTIONS.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
