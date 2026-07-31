import { Link } from "react-router-dom";

interface EmptyProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionPath?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = "No results found",
  message = "Try clearing your search or filter options.",
  actionLabel = "Browse products",
  actionPath,
  onAction,
}: EmptyProps) {
  return (
    <div className="border border-zinc-200 bg-white p-8 text-center max-w-sm mx-auto my-8 space-y-3">
      <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
      <p className="text-xs text-zinc-500">{message}</p>
      {actionPath ? (
        <Link
          to={actionPath}
          className="inline-block px-4 py-2 text-xs bg-black text-white hover:bg-zinc-800 transition-colors"
        >
          {actionLabel}
        </Link>
      ) : onAction ? (
        <button
          onClick={onAction}
          className="inline-block px-4 py-2 text-xs bg-black text-white hover:bg-zinc-800 transition-colors"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
