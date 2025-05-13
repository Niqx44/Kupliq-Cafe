"use client";

import { useState } from 'react';
import NavbarCheckout from '../components/NavbarCheckout';
import Image from 'next/image';
import Footer2 from '../components/footer2';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' | 'ewallet'

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <NavbarCheckout />

      {/* Main Content */}
      <div className="flex-1 pt-28 px-6">
        <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start justify-center">
          {/* Left Side */}
          <div className="w-full md:w-auto flex flex-col items-center">
            {/* Payment Method Buttons */}
            <div className="flex gap-4 mb-6 mt-6 justify-start w-full max-w-md">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`px-4 py-2 rounded-md font-medium border-2 transition ${
                  paymentMethod === 'cash'
                    ? 'border-[#775142] bg-[#775142] text-white'
                    : 'border-[#775142] bg-white text-[#775142]'
                }`}
              >
                Bayar Langsung
              </button>
              <button
                onClick={() => setPaymentMethod('ewallet')}
                className={`px-4 py-2 rounded-md font-medium border-2 transition ${
                  paymentMethod === 'ewallet'
                    ? 'border-[#775142] bg-[#775142] text-white'
                    : 'border-[#775142] bg-white text-[#775142]'
                }`}
              >
                E - Wallet
              </button>
            </div>

            {/* Order Summary */}
            <div className="border border-[#6B4226] rounded-md p-4 w-full max-w-md text-[#6B4226] text-sm">
              <p className="font-semibold mb-3">Meja 1</p>
              <div className="space-y-2">
                {[
                  { name: 'Latte', qty: 1, price: 22000 },
                  { name: 'Ice Coffee', qty: 1, price: 23000 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between w-full font-normal"
                  >
                    <span className="w-[100px]">{item.name}</span>
                    <span className="w-[20px] text-center">x{item.qty}</span>
                    <span className="w-[60px] text-right">
                      {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
                <hr className="my-3 border-[#6B4226]" />
                <div className="flex justify-between font-semibold">
                  <span className="w-[100px]">Subtotal</span>
                  <span className="w-[20px]"></span>
                  <span className="w-[60px] text-right">
                    {(22000 + 23000).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <div className="mt-6 flex justify-start w-full max-w-md">
              <button className="border border-[#6B4226] text-[#6B4226] px-6 py-2 rounded-md hover:bg-[#6B4226] hover:text-white transition font-medium">
                Order
              </button>
            </div>
          </div>

          {/* Right Side: QR muncul hanya saat e-wallet */}
          {paymentMethod === 'ewallet' && (
            <div className="flex flex-col items-center border border-[#6B4226] rounded-md p-6 w-full max-w-xs mx-auto text-[#6B4226]">
              <Image
                src="/qr.png" // Letakkan file ini di folder public/
                alt="QR Code"
                width={200}
                height={200}
              />
              <p className="mt-4 font-medium text-center">Scan QR</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Full Width */}
      <div className="w-full">
        <Footer2 />
      </div>
    </div>
  );
}
