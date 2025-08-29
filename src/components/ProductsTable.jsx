// ProductsTable.jsx
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import Pagination from "./Pagination";
import ProductDrawer from "./ProductDrawer";

export default function ProductsTable({ itemsPerPage = 10, filters = {} }) {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { ...filters },
    fetchPolicy: "cache-and-network",
  });

  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (loading && !data) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const products = data?.products || [];
  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
  const start = (page - 1) * itemsPerPage;
  const displayed = products.slice(start, start + itemsPerPage);

  // --- helper to calculate status from stock vs demand ---
  const getStatus = (p) => {
    if (p.stock > p.demand) return "Healthy";
    if (p.stock === p.demand) return "Low";
    return "Critical";
  };

  // --- badge with colors ---
  const getStatusBadge = (status) => {
    if (status === "Healthy")
      return (
        <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-medium">
          Healthy
        </span>
      );
    if (status === "Low")
      return (
        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-medium">
          Low
        </span>
      );
    if (status === "Critical")
      return (
        <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-medium">
          Critical
        </span>
      );
    return <span>-</span>;
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">SKU</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Warehouse</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">Stock</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">Demand</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {displayed.map((product) => {
              const status = getStatus(product);
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.sku}</td>
                  <td className="px-4 py-3">{product.warehouse}</td>
                  <td className="px-4 py-3 text-right">{product.stock}</td>
                  <td className="px-4 py-3 text-right">{product.demand}</td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(status)}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-sm px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />

      {/* Drawer */}
      {selectedProduct && (
        <ProductDrawer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
