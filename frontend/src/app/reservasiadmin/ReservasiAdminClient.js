"use client";

import { useState } from 'react';
import Link from 'next/link';
import ReservationCard from '../components/ReservationCard';
import ReservationFilter from '../components/ReservationFilter';
import NavbarAdminReservation from '../components/NavbarReservasiAdmin';

const allReservations = [
  { id: 1, name: 'User A', date: '2025-03-19', time: '00:00', status: 'Unconfirmed' },
  { id: 2, name: 'User B', date: '2025-03-19', time: '09:00', status: 'Unconfirmed' },
  { id: 3, name: 'User C', date: '2025-03-19', time: '19:00', status: 'Unconfirmed' },
  { id: 4, name: 'User D', date: '2025-03-19', time: '19:00', status: 'Confirmed' },
  { id: 5, name: 'User E', date: '2025-03-20', time: '18:00', status: 'Confirmed' },
];

const AdminReservationPage = () => {
  const [filters, setFilters] = useState({ name: '', date: '', time: '', status: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = allReservations.filter(r =>
    (!filters.name || r.name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (!filters.date || r.date === filters.date) &&
    (!filters.time || r.time === filters.time) &&
    (!filters.status || r.status === filters.status)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mx-auto min-h-screen bg-[#FDFDFD]">
      <NavbarAdminReservation />

      <div className='px-20'>
        <ReservationFilter onFilterChange={handleFilterChange} />
      </div>

      {/* Daftar reservasi bisa diklik */}
      <div className="px-20 space-y-4 mt-4">
        {paginatedData.map((res, idx) => (
          <Link key={res.id} href={`/detailreservasi/${res.id}`}>
            <ReservationCard {...res} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
        <div className="flex justify-center items-center gap-3 text-[#5C4033] font-medium text-base px-4 py-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 disabled:opacity-30"
          >
            {'<'}
          </button>

          <span>{currentPage}</span>

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 disabled:opacity-30"
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReservationPage;
