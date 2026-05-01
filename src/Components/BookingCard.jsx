import { useState } from "react";

export default function BookingCard({
  home,
  guestCount,
  setGuestCount,
  startDate,
  endDate,
  handleBooking,
}) {
  const nights =
    startDate && endDate
      ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = nights * home.price;

  return (
    <div className="w-full lg:w-80 bg-[#18171F] border border-[#2D2A37] shadow-xl p-6 rounded-2xl sticky top-[100px] space-y-4">

      <div>
        <p className="text-3xl font-bold">₹{home.price}</p>
        <p className="text-[#C9C5D4] text-sm">per night</p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <input id="checkin" placeholder="Check-in" className="dp-input" />
        <input id="checkout" placeholder="Check-out" className="dp-input" />
      </div>

      {/* Guests */}
      <div className="flex justify-between items-center">
        <span>Guests</span>
        <div className="flex items-center gap-3">
          <button onClick={() => guestCount > 1 && setGuestCount(guestCount - 1)}>-</button>
          <span>{guestCount}</span>
          <button onClick={() => guestCount < 5 && setGuestCount(guestCount + 1)}>+</button>
        </div>
      </div>

      {/* Price Breakdown */}
      {nights > 0 && (
        <div className="text-sm text-[#A39EB8] border-t pt-3">
          <p>{nights} nights × ₹{home.price}</p>
          <p className="font-bold text-white mt-1">Total: ₹{totalPrice}</p>
        </div>
      )}

      <button
        onClick={handleBooking}
        className="w-full bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
      >
        Book Now
      </button>
    </div>
  );
}