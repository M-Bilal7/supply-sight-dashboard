import React from "react";

export default function Spinner({ size = 6 }) {
  const px = size * 4; 
  return (
    <div
      aria-hidden="true"
      style={{ width: px, height: px }}
      className="inline-block animate-spin rounded-full border-4 border-gray-200 border-t-gray-600"
    />
  );
}
