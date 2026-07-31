import { useState } from "react";

export default function ProductImageGallery({ images, title }: { images: string[]; title: string }) {
  const [selected, setSelected] = useState<string>(images?.[0] || "");

  const list = images?.length > 0 ? images : [selected];

  return (
    <div className="space-y-3">
      <div className="bg-zinc-50 border border-zinc-200 aspect-square flex items-center justify-center p-4">
        <img src={selected || list[0]} alt={title} className="max-h-full max-w-full object-contain" />
      </div>

      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(img)}
              className={`w-14 h-14 bg-zinc-50 border p-1 flex-shrink-0 ${
                selected === img ? "border-black" : "border-zinc-200 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
