import { AlertCircle } from "lucide-react";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = "Something went wrong loading data.", onRetry }: ErrorProps) {
  return (
    <div className="border border-zinc-200 bg-white p-6 text-center max-w-sm mx-auto my-8 space-y-3">
      <AlertCircle className="w-5 h-5 text-zinc-700 mx-auto" />
      <p className="text-xs text-zinc-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1.5 text-xs bg-black text-white hover:bg-zinc-800 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
