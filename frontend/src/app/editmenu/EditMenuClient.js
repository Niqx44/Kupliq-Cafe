"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import NavbarEditMenu from "../components/NavbarEditMenu";

const dummyData = [
  { id: 1, name: "Iced Coffee", image: "/images/img_rectangle_9.png", category: "Beverage", price: 24000 },
  { id: 2, name: "Latte", image: "/images/img_rectangle_9.png", category: "Beverage", price: 24000 },
  { id: 3, name: "Latte", image: "/images/img_rectangle_9.png", category: "Beverage", price: 24000 },
  { id: 4, name: "Latte", image: "/images/img_rectangle_9.png", category: "Beverage", price: 24000 },
  { id: 5, name: "Latte", image: "/images/img_rectangle_9.png", category: "Beverage", price: 24000 },
  { id: 6, name: "Latte", image: "/images/img_rectangle_9.png", category: "Beverage", price: 24000 },
];

const itemsPerPage = 5;

export default function EditMenuClient() {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredData = useMemo(() => {
    let data = [...dummyData];

    if (searchTerm) {
      data = data.filter((item) =>
        [item.name, item.category, item.price.toString()].some((val) =>
          val.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (filterCategory) {
      data = data.filter((item) => item.category === filterCategory);
    }

    return data;
  }, [searchTerm, filterCategory]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    alert(`Deleting items: ${selectedItems.join(", ")}`);
    setSelectedItems([]);
  };

  const goToEditPage = () => {
    router.push("/additem");
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-white text-black p-6">
      <div className="mb-6">
        <NavbarEditMenu />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-6 items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded text-black w-52"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border px-3 py-2 rounded text-black"
        >
          <option value="">All Categories</option>
          <option value="Beverage">Beverage</option>
          <option value="Food">Food</option>
        </select>

        <button
          onClick={goToEditPage}
          disabled={selectedItems.length > 0}
          className={`px-4 py-2 rounded text-white ${
            selectedItems.length > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#775142] hover:bg-[#4e372d]"
          }`}
        >
          Add
        </button>

        <button
          onClick={handleDelete}
          disabled={selectedItems.length === 0}
          className={`px-4 py-2 rounded text-white ${
            selectedItems.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#775142] hover:bg-[#4e372d]"
          }`}
        >
          Delete
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[30px_1fr_1fr_1fr_1fr_100px] font-semibold border-b py-2 text-gray-800">
        <div></div>
        <div>Name</div>
        <div>Image</div>
        <div>Category</div>
        <div>Price</div>
        <div>Edit</div>
      </div>

      {/* Table Rows */}
      {currentData.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-[30px_1fr_1fr_1fr_1fr_100px] items-center border-b py-2 text-gray-700"
        >
          <input
            type="checkbox"
            checked={selectedItems.includes(item.id)}
            onChange={() => toggleSelect(item.id)}
          />
          <div>{item.name}</div>
          <div>
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded border"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/placeholder.png";
              }}
            />
          </div>
          <div>{item.category}</div>
          <div>Rp{item.price.toLocaleString("id-ID")}</div>
          <div>
            <button
              onClick={() => router.push(`/edititem`)}
              className="bg-[#775142] text-white px-3 py-1 rounded hover:bg-[#4e372d] transition"
            >
              Edit
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-40">
        <div className="bg-white px-4 py-2 flex space-x-2 shadow rounded">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <span className="px-3 py-1">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
