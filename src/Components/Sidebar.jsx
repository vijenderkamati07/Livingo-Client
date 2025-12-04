import { useState } from "react";

export default function Sidebar({ home, guestCount, setGuestCount }) {
  const [open, setOpen] = useState(false);

  const apply = () => setOpen(false);

  return (
    <div className="w-full lg:w-80 bg-[#18171F] border border-[#2D2A37] shadow-xl p-6 rounded-2xl h-fit sticky top-[100px]">
      <p className="text-3xl font-bold">₹{home?.price}</p>
      <p className="text-[#C9C5D4] text-sm mb-5">per night</p>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input id="checkin" placeholder="Check-in" className="dp-input" />
        <input id="checkout" placeholder="Check-out" className="dp-input" />
      </div>

      {/* Guest picker */}
      <div className="relative mb-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="w-full flex items-center justify-between bg-[#0E0D13] px-4 py-3 rounded-xl border border-[#2D2A37]"
        >
          <span>{guestCount} Guest{guestCount > 1 && "s"}</span>
          <svg className="w-5 h-5 text-[#8C5FF6]" fill="none" stroke="currentColor"><path d="M19 9l-7 7-7-7" /></svg>
        </button>

        {open && (
          <div className="guest-popover absolute left-0 right-0 mt-2 p-4 z-20 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm">Guests</span>
              <span className="text-white font-semibold">{guestCount}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm">Total guests</span>
              <div className="flex items-center gap-3">
                <button
                  className="w-8 h-8 rounded-full border"
                  onClick={() => guestCount > 1 && setGuestCount(guestCount - 1)}
                >−</button>
                <span className="w-6 text-center font-semibold">{guestCount}</span>
                <button
                  className="w-8 h-8 rounded-full border"
                  onClick={() => guestCount < 4 && setGuestCount(guestCount + 1)}
                >+</button>
              </div>
            </div>
            <button
              onClick={apply}
              className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] text-white"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      <button className="w-full bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] text-white text-lg font-semibold py-3 rounded-xl">
        Book Now
      </button>

      <p className="text-xs text-[#7F7A95] text-center mt-3">You won't be charged yet</p>
    </div>
  );
}
