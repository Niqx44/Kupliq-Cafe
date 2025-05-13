"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import NavbarCart from "../components/NavbarCart";

const CartItem = ({
  id,
  name,
  price,
  image,
  isChecked,
  onCheckChange,
}) => {
  const [size, setSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const sizes = ["S", "M", "L"];

  const handleSizeChange = () => {
    const currentIndex = sizes.indexOf(size);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    setSize(nextSize);
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl mb-4 shadow-sm mx-10 flex-row gap-x-4">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onCheckChange(id)}
        className="mr-4"
      />
      <img src={image} alt={name} className="w-auto h-16 object-cover rounded" />

      <div className="w-32">
        <div className="font-semibold text-gray-800">{name}</div>
      </div>

      <div className="flex items-center mx-2 w-32">
        <button
          onClick={handleSizeChange}
          className="text-xs text-gray-700 border px-2 py-1 rounded hover:bg-gray-200"
        >
          Size: {size}
        </button>
      </div>

      <div className="flex items-center space-x-2 mx-2 w-32">
        <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-2 py-1 text-gray-800">▼</button>
        <span className="text-gray-800">{quantity}</span>
        <button onClick={() => setQuantity((q) => q + 1)} className="px-2 py-1 text-gray-800 rounded">▲</button>
      </div>

      <div className="text-right w-20 font-semibold text-gray-700">
        {(price * quantity).toLocaleString("id-ID")}
      </div>

      <button className="text-black hover:text-red-700 ml-4">
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default function CartClient() {
  const dummyImage = "/images/img_rectangle_9.png";
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [tableNumber, setTableNumber] = useState(1);

  const allItems = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    name: i === 2 ? "Ice Coffee" : "Latte",
    price: i === 2 ? 23000 : 22000,
    image: dummyImage,
  }));

  const itemsPerPage = 4;
  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  const handleCheckChange = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      alert("Pilih item terlebih dahulu");
    } else {
      setShowModal(true); // buka modal
    }
  };

  const paginatedItems = allItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="mb-10">
        <NavbarCart />
      </div>

      {/* Cart List */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pr-1">
          {paginatedItems.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              isChecked={checkedItems.includes(item.id)}
              onCheckChange={handleCheckChange}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between mt-5 px-20 pb-5">
        {/* Pagination center */}
        <div className="flex-1 flex justify-center items-center space-x-4 ml-30">
          <button
            disabled={currentPage === 1}
            className="text-gray-500 disabled:opacity-50"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt;
          </button>
          <span className="font-medium text-gray-700">{currentPage}</span>
          <button
            disabled={currentPage === totalPages}
            className="text-gray-500 disabled:opacity-50"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &gt;
          </button>
        </div>

        {/* Tombol pesan kanan */}
        <div className="flex justify-center items-center">
          <button
            onClick={handleOrder}
            className={`p-2 px-8 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition ${
              checkedItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={checkedItems.length === 0}
          >
            Pesan
          </button>
        </div>
      </footer>

      {/* Modal Nomor Meja */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md text-center w-[90%] max-w-md">
            <h2 className="text-2xl font-semibold text-[#775142] mb-6">Pilih Nomor Meja</h2>
            <input
              type="number"
              min={1}
              max={99}
              value={tableNumber}
              onChange={(e) => setTableNumber(parseInt(e.target.value))}
              className="border-2 border-[#775142] text-[#775142] text-xl text-center rounded-md px-4 py-2 mb-4 w-20"
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  alert(`Pesanan untuk meja nomor ${tableNumber} berhasil dibuat!`);
                  // Tambahkan logic submit di sini jika perlu
                }}
                className="bg-[#775142] text-white px-4 py-2 rounded-md"
              >
                Lanjut
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
