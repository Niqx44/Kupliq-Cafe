'use client';

import { useState } from 'react';
import Image from 'next/image';
import NavbarReserve from '../components/NavbarReserve';

export default function ReservationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log('Data:', formData);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <NavbarReserve />

      {/* Background */}
      <div className="flex-1 relative">
        <Image
          src="/images/reservebg.png"
          alt="Background"
          fill
          className="object-cover z-0"
        />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex flex-col md:flex-row w-full h-full">
            {/* Left image (selalu tampil) */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <Image
                src="/images/reserveimg.png"
                alt="Cup Image"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>

            {/* Right content */}
            <div className="w-full md:w-auto pl-25 py-10 flex flex-col justify-center space-y-4 text-white" style={{ fontFamily: 'Abhaya Libre' }}>
              {isSubmitted ? (
                <div className="text-left">
                  <h2 className="text-5xl font-extrabold mb-2">
                    Thanks For Your Reservation
                  </h2>
                  <p className="text-[#d2bda8] font">
                    Check “My Reservation” to see confirmation status
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      icon="📅"
                      placeholder="Date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                    />
                    <InputField
                      icon="⏰"
                      placeholder="Time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                    />
                  </div>
                  <InputField
                    icon="👤"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  <InputField
                    icon="📞"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                  <InputField
                    icon="📧"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />

                  <button
                    onClick={handleSubmit}
                    className="mt-6 py-3 px-6 border bg-[#624c3d] border-[#785d4b] text-white rounded-full hover:bg-white hover:text-[#5b2e14] transition font-semibold"
                  >
                    Reserve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-[#5b2e14] py-10 font-semibold">
        #TETAPDIKUPLIQ
      </footer>
    </div>
  );
}

// ✅ InputField Component
function InputField({ icon, placeholder, type = 'text', value, onChange }) {
  return (
    <div className="flex items-center bg-white text-[#5b2e14] px-4 py-3 rounded-md">
      <span className="mr-2">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent outline-none w-full placeholder:text-[#5b2e14] text-[#5b2e14]"
      />
    </div>
  );
}
