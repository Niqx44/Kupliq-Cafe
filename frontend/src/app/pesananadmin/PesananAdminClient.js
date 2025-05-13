"use client";

import { useState } from "react";
import NavbarPesananAd from "../components/NavbarPesananAd";

const dummyOrders = [
  {
    id: 1,
    table: "Meja 5",
    date: "12/03/2025",
    items: [
      { name: "Latte", qty: 1, price: 22000 },
      { name: "Ice Coffee", qty: 1, price: 23000 },
    ],
    method: "Bayar Langsung",
    status: "Unconfirmed",
  },
  {
    id: 2,
    table: "Meja 5",
    date: "12/03/2025",
    items: [
      { name: "Mocha", qty: 1, price: 21000 },
      { name: "Ice Coffee", qty: 1, price: 23000 },
    ],
    method: "E-Wallet",
    status: "Selesai",
  },
  {
    id: 3,
    table: "Meja 5",
    date: "12/03/2025",
    items: [
      { name: "Mocha", qty: 1, price: 21000 },
      { name: "Ice Coffee", qty: 1, price: 23000 },
    ],
    method: "E-Wallet",
    status: "Selesai",
  }
];

const ORDERS_PER_PAGE = 2;

export default function DaftarPesananPage() {
  const [orders, setOrders] = useState(dummyOrders);
  const [currentPage, setCurrentPage] = useState(1);

  const handleStatusChange = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white">
      <NavbarPesananAd />

      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        {paginatedOrders.map((order) => {
          const subtotal = order.items.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
          );
          return (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm border-[#5C4033]"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-[#5C4033]">{order.table}</span>
                <span className="text-[#5C4033]">{order.date}</span>
              </div>

              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 text-[#5C4033] text-sm"
                  >
                    <div>{item.name}</div>
                    <div className="text-center">x{item.qty}</div>
                    <div className="text-right">{item.price}</div>
                  </div>
                ))}
              </div>

              <hr className="my-2 border-[#5C4033]" />
              <div className="flex justify-between text-[#5C4033] font-semibold">
                <span>Subtotal</span>
                <span>{subtotal}</span>
              </div>
              <div className="mt-2 text-[#5C4033] font-medium">
                Metode Bayar | {order.method}
              </div>

              {order.status === "Unconfirmed" ? (
                <div className="mt-2 flex gap-3 justify-end">
                  <button
                    onClick={() => handleStatusChange(order.id, "Dibatalkan")}
                    className="bg-[#5C4033] text-white px-4 py-1 rounded shadow"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "Selesai")}
                    className="bg-[#5C4033] text-white px-4 py-1 rounded shadow"
                  >
                    Selesai
                  </button>
                </div>
              ) : (
                <div className="mt-2 flex justify-end text-[#5C4033] font-semibold">
                  {order.status}
                </div>
              )}
            </div>
          );
        })}

        {/* Pagination */}
        <div className="fixed bottom-0 left-0 w-full bg-white py-2 shadow-inner flex justify-center gap-2 z-40">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 text-[#5C4033] disabled:text-gray-400"
          >
            &lt;
          </button>
          <span className="text-[#5C4033] font-medium">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 text-[#5C4033] disabled:text-gray-400"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
