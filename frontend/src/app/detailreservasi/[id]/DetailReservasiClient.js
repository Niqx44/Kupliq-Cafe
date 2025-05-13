"use client";

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import NavbarDetailNav from '../../components/NavbarDetailRev';

const dummyReservations = [
  {
    id: "1",
    name: "My Reservation",
    date: "2025-03-20",
    time: "21:00",
    phone: "081537285318",
    email: "myreservation@gmail.com",
    status: "Unconfirmed"
  },
  {
    id: "2",
    name: "User B",
    date: "2025-03-21",
    time: "10:00",
    phone: "08123456789",
    email: "userb@email.com",
    status: "Unconfirmed"
  }
];

export default function ReservationDetailPage() {
  const { id } = useParams();
  const reservation = dummyReservations.find(r => r.id === id);
  const [status, setStatus] = useState(reservation?.status || "Unconfirmed");

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Di implementasi sesungguhnya, lakukan PUT/POST ke API
  };

  if (!reservation) {
    return (
      <div className="min-h-screen p-10 flex justify-center items-center bg-white">
        <p className="text-[#5C4033] text-xl font-semibold">Reservation not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavbarDetailNav />

      <div className="flex flex-col items-center justify-center px-6 pt-40 pb-10">
        <div className="bg-[#794c39] p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="space-y-4">
            <InputWithIcon icon={<FaCalendarAlt />} value={reservation.date} />
            <InputWithIcon icon={<FaClock />} value={reservation.time} />
            <InputWithIcon icon={<FaUser />} value={reservation.name} />
            <InputWithIcon icon={<FaPhone />} value={reservation.phone} />
            <InputWithIcon icon={<FaEnvelope />} value={reservation.email} />
          </div>

          {status === "Unconfirmed" ? (
              <div className="flex justify-end items-center gap-3 mt-6 min-h-[56px]">
                  <button
                    onClick={() => handleStatusChange("Rejected")}
                    className="bg-[#f2f2f2] text-[#5C4033] px-4 py-2 rounded hover:bg-[#e4e4e4]"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatusChange("Confirmed")}
                     className="bg-[#f2f2f2] text-[#5C4033] px-4 py-2 rounded hover:bg-[#e4e4e4]"
                  >
                    Confirm
                  </button>
              </div>
              ) : (
               <div className="mt-6 text-white text-center font-semibold min-h-[56px] flex items-center justify-center">
                    Status:{" "}
                      <span className={status === "Confirmed" ? "text-green-400" : "text-red-400"}>
                        {status}
                      </span>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Komponen input readonly dengan ikon
const InputWithIcon = ({ icon, value }) => (
  <div className="flex items-center bg-white rounded px-3 py-2 text-[#5C4033]">
    <div className="mr-2">{icon}</div>
    <input
      type="text"
      value={value}
      readOnly
      className="bg-transparent outline-none w-full"
    />
  </div>
);
