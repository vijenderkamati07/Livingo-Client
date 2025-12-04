// src/Components/form/CategoryGridSelector.jsx
export default function CategoryGridSelector({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange?.(opt.id)}
            className={`relative text-left rounded-2xl px-3.5 py-3 flex flex-col gap-1 border text-xs sm:text-sm transition-all duration-250
              ${
                selected
                  ? "border-[#8C5FF6] bg-gradient-to-br from-[#1A1528] via-[#241B38] to-[#1C1427] shadow-[0_0_25px_rgba(140,95,246,0.55)] scale-[1.02]"
                  : "border-[#2D2A37] bg-[#16141F] hover:border-[#8C5FF640] hover:bg-[#1C1827]"
              }
            `}
          >
            <span className="text-lg">{opt.emoji}</span>
            <span className="font-medium text-[#E5E3F3]">{opt.label}</span>
            {opt.tag && (
              <span className="text-[10px] text-[#9D99B0] truncate">
                {opt.tag}
              </span>
            )}
            {selected && (
              <span className="absolute top-2 right-2 w-4 h-4 rounded-full border border-[#22C55E]/70 bg-[#052E16] flex items-center justify-center text-[10px] text-[#BBF7D0]">
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
