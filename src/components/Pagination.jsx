import React from "react";

export default function Pagination({ page, setPage, totalPages }) {
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-between px-2">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        disabled={page === 1}
      >
        Prev
      </button>

      <div className="flex gap-2">
        {start > 1 && (
          <>
            <button className="px-3 py-1 rounded bg-white border" onClick={() => setPage(1)}>1</button>
            {start > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded ${p === page ? "bg-indigo-600 text-white" : "bg-white border"}`}
          >
            {p}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="px-2">...</span>}
            <button className="px-3 py-1 rounded bg-white border" onClick={() => setPage(totalPages)}>
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
