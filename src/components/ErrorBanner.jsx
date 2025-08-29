import React, { useEffect, useState } from "react";
import { setGlobalErrorHandler, clearGlobalErrorHandler } from "../lib/errorService";

export default function ErrorBanner() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setGlobalErrorHandler((msg) => {
      setMessage(String(msg).slice(0, 500));
    });
    return () => clearGlobalErrorHandler();
  }, []);

  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      <div className="bg-red-600 text-white rounded shadow p-3 flex items-start gap-3">
        <div className="flex-1">
          <div className="font-semibold">Error</div>
          <div className="text-sm mt-1 whitespace-pre-wrap">{message}</div>
        </div>
        <div className="flex items-start gap-2">
          <button
            onClick={() => setMessage(null)}
            className="px-3 py-1 rounded bg-red-700 hover:bg-red-800"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
