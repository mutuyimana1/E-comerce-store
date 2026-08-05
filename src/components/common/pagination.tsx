interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  pages.push(1);

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-1 py-8" role="navigation" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="px-3 py-1.5 text-xs font-medium border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {pages.map((p, index) => {
        if (p === "...") {
          return (
            <span key={`ellipsis-${index}`} className="px-2 py-1.5 text-xs text-zinc-400">
              ...
            </span>
          );
        }

        const pageNum = p as number;
        const isActive = currentPage === pageNum;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Page ${pageNum}`}
            className={`w-8 h-8 text-xs font-medium border transition-colors ${
              isActive
                ? "bg-black text-white border-black ring-2 ring-black/20"
                : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="px-3 py-1.5 text-xs font-medium border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
