import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function TrendChart({ data, height = 240 }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-56 flex items-center justify-center text-gray-500">
        No chart data
      </div>
    );
  }

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          {/* Grid lines for readability */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          {/* X & Y axis */}
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />

          {/* Hover tooltip */}
          <Tooltip
            formatter={(value, name) => [
              value,
              name === "stock" ? "Stock" : "Demand",
            ]}
            labelFormatter={(label) => `Date: ${label}`}
          />

          {/* Legend */}
          <Legend verticalAlign="top" height={30} />

          {/* Stock line */}
          <Line
            type="monotone"
            dataKey="stock"
            name="Stock"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={false}
          />

          {/* Demand line */}
          <Line
            type="monotone"
            dataKey="demand"
            name="Demand"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
