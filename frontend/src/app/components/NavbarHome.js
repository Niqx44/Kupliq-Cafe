"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NavbarHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-black/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="px-32 mx-auto flex justify-between items-center py-7 transition-all duration-500">
        <Link
          href="/"
          className="text-4xl text-white font-medium"
          style={{ fontFamily: "Cormorant Infant, serif" }}
        >
          Kupliq Cafe
        </Link>
        <ul className="flex space-x-14 text-white" style={{ fontFamily: "Fairplay Display" }}>
          <li>
            <Link href="/" className="hover:text-gray-300 transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/menu" className="hover:text-gray-300 transition-colors duration-300">
              Menu
            </Link>
          </li>
          <li>
            <Link href="/reservation" className="hover:text-gray-300 transition-colors duration-300">
              Reservation
            </Link>
          </li>
        </ul>
            <Link href="/profile" className="flex items-center space-x-4 group">
              <span
                className="text-white group-hover:text-gray-300 transition-colors duration-300"
                style={{ fontFamily: "Fairplay Display" }}
              >
                Faizal Saputro
              </span>
              <img
                src="/images/img_rectangle_9.png" // Ganti path ke foto profil yang kamu simpan
                alt="Faizal Saputro"
                className="w-10 h-10 rounded-full object-cover border border-white group-hover:border-gray-300 transition-all duration-300"
              />
            </Link>
      </div>
    </nav>
  );
};

export default NavbarHome;
