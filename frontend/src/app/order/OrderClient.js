'use client';

import { useEffect, useState } from 'react';
import NavbarOrder from '../components/NavbarOrder';

export default function MyOrderPage() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Ambil user_id dari localStorage saat client-side
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('user_id');
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:8080/pemesanan/${userId}`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Gagal mengambil data order:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#6B4226]">
      <div className="px-6 py-6 flex-1">
        <NavbarOrder />

        <div className="pt-30 space-y-6 flex flex-col items-start px-15">
          {orders.map((order) => (
            <div
              key={order.id_pemesanan}
              className="relative border border-[#6B4226] rounded-md p-4 w-full max-w-xl"
            >
              {/* Header */}
              <div className="flex justify-between mb-4 text-sm font-semibold">
                <span>Meja {order.id_meja}</span>
                <span>{new Date(order.tanggal_pemesanan).toLocaleDateString('id-ID')}</span>
              </div>

              {/* Items */}
              <div className="space-y-2 text-sm">
                {order.items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2">
                    <span className="truncate">{item.nama_menu}</span>
                    <span className="text-center">x{item.jumlah}</span>
                    <span className="text-right">
                      {(item.sub_total ?? 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}

                <hr className="my-2 border-[#775142]" />

                <div className="grid grid-cols-3 font-semibold">
                  <span>Subtotal</span>
                  <span></span>
                  <span className="text-right">
                    {(order.total_harga ?? 0).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 text-sm flex justify-between items-center">
                <p>Metode Bayar | (tidak tersedia)</p>
                <p className="italic">Status: {order.status}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
