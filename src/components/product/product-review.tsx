import { Star } from "lucide-react";
import type { Review } from "../../types";

export default function ProductReview({ reviews }: { reviews?: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-xs text-zinc-400 py-4">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-black">Reviews ({reviews.length})</h3>
      <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
        {reviews.map((r, i) => (
          <div key={i} className="py-3 text-xs space-y-1">
            <div className="flex justify-between items-center text-zinc-500">
              <span className="font-semibold text-zinc-900">{r.reviewerName}</span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${star <= r.rating ? "fill-black text-black" : "text-zinc-200"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-zinc-600">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
