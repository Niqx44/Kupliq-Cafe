'use client';
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function NavbarMenu() {

const router = useRouter(); 
  return (
    <nav className="bg-white shadow-md text-white p-4 backdrop-blur-md sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between gap-8 mt-4 px-15">
        {/* Left Section: Judul */}
        <h1 className="text-4xl font-semibold text-[#775142]">Menu</h1>

        {/* Middle Section: SearchBar */}
        <div className="flex-1 mx-4">
          <SearchBar />
        </div>

        {/* Right Section: Buttons */}
        <div className="flex items-center space-x-4">
          <button
          onClick={() => router.push("/cart")}  
          className="p-2 px-8 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition">
            Cart
          </button>
          <button
          onClick={() => router.push("/order")}  
          className="p-2 px-8 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition">
            Pesanan Saya
          </button>
          <button
          onClick={() => router.push("/")} 
          className="p-2 px-8 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition">
            Back
          </button>
        </div>
      </div>

      {/* Bottom Menu Categories */}
      <div className="flex justify-start mt-8 space-x-6 text-sm font-medium px-15">
        <button className="text-[#775142] hover:text-[#4d342a] transition">All Product</button>
        <button className="text-[#775142] hover:text-[#4d342a] transition">Food</button>
        <button className="text-[#775142] hover:text-[#4d342a] transition">Beverages</button>
      </div>
    </nav>
  );    
}
