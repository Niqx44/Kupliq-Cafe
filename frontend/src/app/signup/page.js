"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika penyimpanan data user bisa ditambahkan di sini
    // Setelah berhasil sign up, arahkan ke halaman sign in
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-8 shadow-sm">
        <Link href="/">
          <div
            className="text-3xl font-regular text-[#5C3A2E] cursor-pointer"
            style={{ fontFamily: "Cormorant Infant" }}
          >
            Kupliq Cafe
          </div>
        </Link>
        <div className="space-x-8 pr-10">
          <Link href="/signin">
            <span className="text-[#5C3A2E] hover:underline text-sm cursor-pointer">
              Sign In
            </span>
          </Link>
          <Link href="/signup">
            <span className="bg-[#5C3A2E] text-white px-4 py-4 rounded-full text-sm hover:bg-[#4a2f25] cursor-pointer">
              Sign Up
            </span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 justify-center items-center">
        {/* Form */}
        <div className="w-2/5 max-w-md px-6">
          <h1
            className="text-4xl font-extrabold text-[#5C3A2E] mb-2"
            style={{ fontFamily: "Abhaya Libre" }}
          >
            Create Your Kupliq Cafe Account
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Join our cozy community and enjoy exclusive offers. Just fill in
            your details to get started!
          </p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C3A2E]"
            />
            <input
              type="email"
              placeholder="Email"
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C3A2E]"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C3A2E]"
            />
            <input
              type="password"
              placeholder="Password"
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C3A2E]"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C3A2E]"
            />
            <button
              type="submit"
              className="w-full bg-[#5C3A2E] text-white py-2 rounded-md text-sm hover:bg-[#4a2f25] transition-colors"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            or continue with
          </div>
          <div className="flex justify-center space-x-4 mt-2">
            <button>
              <img src="/images/fb.png" alt="Facebook" className="w-5 h-5" />
            </button>
            <button>
              <img src="/images/google.png" alt="Google" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="w-1/4 hidden md:block">
          <img
            src="/images/Slider.png"
            alt="Cafe"
            className="w-full h-auto object-cover rounded-l-2xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
