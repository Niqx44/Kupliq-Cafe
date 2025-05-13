"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import NavbarEditItem from "../components/NavbarEditItem";

export default function EditMenuForm() {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState("/images/latte.png"); // Gambar default
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data berhasil disimpan!");
    // Lanjutkan dengan API atau route lain jika perlu
  };

  return (
    <div className="min-h-screen bg-white text-[#5a2e1a] px-6 pt-28">
      <NavbarEditItem />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-start justify-center gap-8 mt-10"
      >
        {/* Left: Image Upload */}
        <div className="flex flex-col items-center">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded border border-[#5a2e1a]"
          />
          <label className="mt-4 px-4 py-2 border border-[#5a2e1a] rounded cursor-pointer shadow-sm hover:bg-[#f3f3f3]">
            Upload Foto
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        {/* Right: Form Inputs */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Nama Produk"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border border-[#5a2e1a] rounded px-4 py-2 outline-none focus:ring-1 focus:ring-[#5a2e1a]"
            required
          />

          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-[#5a2e1a] rounded px-4 py-2 outline-none focus:ring-1 focus:ring-[#5a2e1a]"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-[#5a2e1a] rounded px-4 py-2 outline-none focus:ring-1 focus:ring-[#5a2e1a]"
            required
          >
            <option value="">Kategori</option>
            <option value="Beverage">Beverage</option>
            <option value="Food">Food</option>
          </select>

          <input
            type="text"
            placeholder="Deskripsi Singkat"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-[#5a2e1a] rounded px-4 py-2 outline-none focus:ring-1 focus:ring-[#5a2e1a]"
          />

          <button
            type="submit"
            className="mt-2 px-6 py-2 border border-[#5a2e1a] rounded-full hover:bg-[#5a2e1a] hover:text-white transition"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
