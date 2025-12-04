import { useState } from "react";

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const options = [
    "Latest added",
    "Price: Low to High",
    "Price: High to Low",
    "Most booked"
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#0E0D13] border border-[#2D2A37] rounded-xl px-4 py-2 text-sm w-44 justify-between"
      >
        {value}
        <svg className="w-5 h-5 text-[#8C5FF6]" fill="none" stroke="currentColor">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="guest-popover absolute mt-2 p-2 rounded-xl z-30 w-44">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="dropdown-btn text-left w-full"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
