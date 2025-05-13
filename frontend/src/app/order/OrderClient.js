'use client';

import { useState } from 'react';
import NavbarOrder from '../components/NavbarOrder';

const ordersPerPage = 2;

const allOrders = [
  {
    id: 1,
    table: 'Meja 5',
    date: '12/03/2025',
    items: [
      { name: 'Latte', qty: 1, price: 22000 },
      { name: 'Ice Coffee', qty: 1, price: 23000 },
    ],
    method: 'Bayar Langsung',
    isDone: false,
  },
  {
    id: 2,
    table: 'Meja 5',
    date: '12/03/2025',
    items: [
      { name: 'Mocha', qty: 1, price: 21000 },
      { name: 'Ice Coffee', qty: 1, price: 23000 },
    ],
    method: 'E-Wallet',
    isDone: true,
  },
  {
    id: 3,
    table: 'Meja 2',
    date: '11/03/2025',
    items: [{ name: 'Espresso', qty: 2, price: 15000 }],
    method: 'Bayar Langsung',
    isDone: true,
  },
];

export default function MyOrderPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

  const paginatedOrders = allOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#6B4226]">
      <div className="px-6 py-6 flex-1">
        <NavbarOrder />

        <div className="pt-30 space-y-6 flex flex-col items-start px-15">
          {paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="relative border border-[#6B4226] rounded-md p-4 w-full max-w-xl"
            >
              {/* Header */}
              <div className="flex justify-between mb-4 text-sm font-semibold">
                <span>{order.table}</span>
                <span>{order.date}</span>
              </div>

              {/* Items */}
              <div className="space-y-2 text-sm">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 gap-2"
                  >
                    <span className="truncate">{item.name}</span>
                    <span className="text-center">x{item.qty}</span>
                    <span className="text-right">{item.price.toLocaleString('id-ID')}</span>
                  </div>
                ))}

                <hr className="my-2 border-[#775142]" />

                <div className="grid grid-cols-3 font-semibold">
                  <span>Subtotal</span>
                  <span></span>
                  <span className="text-right">
                    {order.items
                      .reduce((total, item) => total + item.qty * item.price, 0)
                      .toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <p className="mt-4 text-sm">Metode Bayar | {order.method}</p>

              {/* Status Bulatan */}
              <div
                className={`absolute bottom-4 right-4 w-4 h-4 rounded-full ${
                  order.isDone ? 'bg-[#775142]' : 'bg-gray-300'
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination FIXED at bottom */}
      <div className="w-full sticky bottom-0 bg-white py-4 flex justify-center items-center space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-1 py-1 rounded disabled:opacity-50"
        >
          &lt;
        </button>
        <span className="py-1 rounded text-center">
          {currentPage}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-1 py-1 rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
