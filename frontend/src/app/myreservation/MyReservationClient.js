"use client";

import { useState } from 'react';
import NavbarMyReservation from '../components/NavbarMyReservation';
import ReservationCard from '../components/ReservationCard';
import ReservationFilter from '../components/ReservationFilter';

const allReservations = [
  { name: 'User A', date: '2025-03-19', time: '00:00', status: 'Unconfirmed' },
  { name: 'User B', date: '2025-03-19', time: '09:00', status: 'Unconfirmed' },
  { name: 'User C', date: '2025-03-19', time: '19:00', status: 'Unconfirmed' },
  { name: 'User D', date: '2025-03-19', time: '19:00', status: 'Confirmed' },
  { name: 'User E', date: '2025-03-20', time: '18:00', status: 'Confirmed' },
];

const MyReservationPage = () => {
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
      <NavbarMyReservation />
      <div className='px-20'>
          <ReservationFilter onFilterChange={handleFilterChange} />
      </div>
      {paginatedData.map((res, idx) => (
        <ReservationCard key={idx} {...res} />
      ))}

      <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
            <div className="flex justify-center items-center gap-3 text-[#5C4033] font-medium text-base bg-[#FDFDFD] px-4 py-2 rounded-md shadow-md">
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

export default MyReservationPage;
