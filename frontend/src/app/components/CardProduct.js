"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const CardProduct = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get("http://localhost:8080/menu");
        setMenus(response.data);
      } catch (error) {
        console.error("Gagal fetch menu:", error);
      }
    };

    fetchMenus();
  }, []);

  const handleAddToCart = (menu) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = existingCart.findIndex((item) => item.id === menu.id_menu);
    if (itemIndex !== -1) {
      // jika sudah ada, tambahkan quantity
      existingCart[itemIndex].quantity += 1;
    } else {
      // jika belum ada, tambahkan baru
      existingCart.push({
        id: menu.id_menu,
        name: menu.nama_menu,
        price: menu.harga_menu,
        quantity: 1,
        image: "/images/—Pngtree—coffee cup ceramic coffee transparent_9057114.png", // Default img
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${menu.nama_menu} ditambahkan ke keranjang`);
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="grid grid-cols-4 gap-12 px-4 py-8">
        {menus.map((menu) => (
          <div
            key={menu.id_menu}
            className="w-[300px] h-[360px] p-4 border rounded-xl shadow-md hover:shadow-lg transition bg-[#F4F4F4] flex flex-col justify-between"
          >
            <div className="flex justify-center items-center">
              <img
                src="/images/—Pngtree—coffee cup ceramic coffee transparent_9057114.png"
                alt={menu.nama_menu}
                className="w-48 h-48 mt-6"
              />
            </div>
            <div className="mt-2 pl-4">
              <h2 className="text-xl font-semibold text-[#817c7a] mb-6">
                {menu.nama_menu}
              </h2>
              <div className="flex flex-wrap items-center justify-between mb-6">
                <p className="text-lg font-normal text-[#775142]">
                  Rp {menu.harga_menu.toLocaleString("id-ID")}
                </p>
                <img
                  src="/buy.svg"
                  alt="Buy Icon"
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => handleAddToCart(menu)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardProduct;
