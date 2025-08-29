let handler = null;

export const setGlobalErrorHandler = (fn) => {
  handler = fn;
};

export const clearGlobalErrorHandler = () => {
  handler = null;
};

export const notifyGlobalError = (message) => {
  if (!message) return;
  if (typeof handler === "function") {
    try {
      handler(message);
    } catch (e) {
      console.error("Error handler threw:", e);

      console.error("Original error:", message);
    }
  } else {
    console.error("Global error (no handler registered):", message);
  }
};
