import React from "react";

export default function KPICards({ totalStock, totalDemand, fillRate, loading }) {
  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading KPIs...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Stock */}
      <div className="bg-white rounded shadow p-6 text-center">
        <h3 className="text-sm text-gray-500">Total Stock</h3>
        <p className="text-2xl font-bold text-indigo-600">{totalStock}</p>
      </div>

      {/* Total Demand */}
      <div className="bg-white rounded shadow p-6 text-center">
        <h3 className="text-sm text-gray-500">Total Demand</h3>
        <p className="text-2xl font-bold text-indigo-600">{totalDemand}</p>
      </div>

      {/* Fill Rate */}
      <div className="bg-white rounded shadow p-6 text-center">
        <h3 className="text-sm text-gray-500">Fill Rate</h3>
        <p className="text-2xl font-bold text-indigo-600">{fillRate.toFixed(1)}%</p>
      </div>
    </div>
  );
}
