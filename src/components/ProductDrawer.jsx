import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_DEMAND, TRANSFER_STOCK, GET_PRODUCTS, GET_KPIS } from "../graphql/queries";
import ErrorBanner from "./ErrorBanner";

export default function ProductDrawer({ product, onClose }) {
  const [demand, setDemand] = useState(0);
  const [transferQty, setTransferQty] = useState(0);
  const [toWarehouse, setToWarehouse] = useState("");

  useEffect(() => {
    if (product) {
      setDemand(product.demand ?? 0);
      setTransferQty(0);
      setToWarehouse("");
    }
  }, [product]);

  // --- updateDemand mutation ---
  const [updateDemand, { loading: updatingDemand }] = useMutation(
    UPDATE_DEMAND,
    {
      refetchQueries: [{ query: GET_PRODUCTS }, { query: GET_KPIS }],
      onError(err) {
        ErrorBanner(err.message || "Update demand failed");
      },
    }
  );

  // --- transferStock mutation ---
  const [transferStock, { loading: transferring }] = useMutation(TRANSFER_STOCK, {
    onCompleted() {
      alert("Transfer successful");
      onClose();
    },
    onError(err) {
      ErrorBanner(err.message || "Transfer failed");
    },
  });

  if (!product) return null;

  // --- demand save handler ---
  const handleSaveDemand = async () => {
    const newDemand = parseInt(demand, 10) || 0;
    await updateDemand({
      variables: { id: product.id, demand: newDemand },
      optimisticResponse: {
        updateDemand: {
          __typename: "Product",
          id: product.id,
          demand: newDemand,
          stock: product.stock,
          updatedAt: new Date().toISOString(),
        },
      },
    });
    onClose();
  };

  // --- transfer handler ---
  const handleTransfer = async () => {
    const qty = parseInt(transferQty, 10) || 0;
    if (qty <= 0) {
      alert("Enter a positive transfer quantity");
      return;
    }
    await transferStock({
      variables: {
        id: product.id,
        from: product.warehouse,
        to: toWarehouse,
        qty,
      },
      optimisticResponse: {
        transferStock: {
          __typename: "Product",
          id: product.id,
          stock: Math.max(0, product.stock - qty),
          demand: product.demand,
          warehouse: toWarehouse || product.warehouse,
        },
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 flex z-50">

      {/* --- Side drawer panel --- */}
      <div
        className="ml-auto w-full max-w-md bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // stops close when clicking inside
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Edit: {product.name}</h3>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        {/* --- Product Info --- */}
        <div className="space-y-2 mb-6">
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Warehouse:</strong> {product.warehouse}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Demand:</strong> {product.demand}</p>
        </div>

        {/* --- Update Demand --- */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600">Demand</label>
          <input
            type="number"
            value={demand}
            onChange={(e) => setDemand(e.target.value)}
            className="w-full border rounded px-3 py-2"
            min={0}
          />
          <button
            onClick={handleSaveDemand}
            disabled={updatingDemand}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-60"
          >
            {updatingDemand ? "Saving..." : "Save Demand"}
          </button>
        </div>

        {/* --- Transfer Stock --- */}
        <div>
          <label className="block text-sm text-gray-600">Transfer Stock</label>
          <input
            type="number"
            placeholder="Quantity"
            value={transferQty}
            onChange={(e) => setTransferQty(e.target.value)}
            className="w-1/3 border rounded px-3 py-2 mr-2"
            min={0}
          />
          <input
            type="text"
            placeholder="To warehouse"
            value={toWarehouse}
            onChange={(e) => setToWarehouse(e.target.value)}
            className="w-2/3 border rounded px-3 py-2"
          />
          <button
            onClick={handleTransfer}
            disabled={transferring}
            className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-60"
          >
            {transferring ? "Transferring..." : "Transfer"}
          </button>
        </div>
      </div>
    </div>
  );
}
