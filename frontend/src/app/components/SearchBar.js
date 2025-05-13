// components/SearchBar.jsx
'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="flex items-center space-x-2 w-full max-w-4xl rounded-full text-[#775142] border-2 border-[#775142] bg-white px-4 py-2">
      <img
        src="/Frame.svg" // Pastikan file ini ada di folder public
        alt="Search Icon"
        className="h-5 w-5"
      />
      <input
        type="text"
        className="flex-1 bg-transparent outline-none pl-2 text-[#775142]"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}
