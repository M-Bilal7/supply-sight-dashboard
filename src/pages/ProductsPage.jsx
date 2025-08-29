import React, { useState } from "react";
import KPICards from "../components/KPICards";
import ProductsTable from "../components/ProductsTable";
import TrendChart from "../components/TrendChart";
import { useQuery } from "@apollo/client";
import { GET_KPIS, GET_WAREHOUSES, GET_PRODUCTS } from "../graphql/queries";
import { computeTotals } from "../utils/computeTotals";

export default function ProductsPage() {
  const [range, setRange] = useState("7d");
  const [filters, setFilters] = useState({
    search: "",
    warehouse: "",
    status: "",
  });

  // query warehouses
  const { data: warehouseData } = useQuery(GET_WAREHOUSES);

  // query KPIs trend
  const { data: kpiData, loading: kpiLoading, error: kpiError } = useQuery(
    GET_KPIS,
    { variables: { range } }
  );

  // query products
  const { data: productData, loading: productLoading } = useQuery(
    GET_PRODUCTS,
    { variables: { ...filters } }
  );

  const products = productData?.products || [];
  const { totalStock, totalDemand, fillRate } = computeTotals(products);

  return (
    <div className="space-y-6 p-6">
      {/* --- Top Bar --- */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SupplySight</h1>
        <div className="flex gap-2">
          {["7d", "14d", "30d"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded ${
                range === r ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* --- KPI Cards --- */}
      <KPICards
        totalStock={totalStock}
        totalDemand={totalDemand}
        fillRate={fillRate}
        loading={productLoading}
      />

      {/* --- Filters Row --- */}
      <div className="flex gap-4 items-center bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search by name, SKU, ID..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border px-3 py-2 rounded w-1/3"
        />

        <select
          value={filters.warehouse}
          onChange={(e) =>
            setFilters({ ...filters, warehouse: e.target.value })
          }
          className="border px-3 py-2 rounded"
        >
          <option value="">All Warehouses</option>
          {warehouseData?.warehouses?.map((w: any) => (
            <option key={w.code} value={w.code}>
              {w.name}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Healthy">Healthy</option>
          <option value="Low">Low</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      {/* --- Main Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductsTable itemsPerPage={10} filters={filters} />
        </div>
        <div className="lg:col-span-1 bg-white p-4 rounded shadow">
          {kpiLoading && (
            <div className="h-56 flex items-center justify-center text-gray-500">
              Loading chart...
            </div>
          )}
          {kpiError && (
            <div className="h-56 flex items-center justify-center text-red-500">
              Failed to load chart
            </div>
          )}
          {!kpiLoading && !kpiError && (
            <TrendChart data={kpiData?.kpis || []} />
          )}
        </div>
      </div>
    </div>
  );
}



