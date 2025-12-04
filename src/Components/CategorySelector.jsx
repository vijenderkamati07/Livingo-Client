const CATEGORIES = [
  { id: "Resort", label: "Resort", emoji: "🏖️" },
  { id: "Apartment", label: "Apartment", emoji: "🏢" },
  { id: "Villas", label: "Villa", emoji: "🏡" },
  { id: "Farmhouses", label: "Farmhouse", emoji: "🌾" },
  { id: "Hostels", label: "Hostel", emoji: "🛏️" },
  { id: "Rooms", label: "Room", emoji: "🚪" },
];

export default function CategorySelector({ value, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="label mb-0">Category</label>
        <span className="text-[11px] text-[#7F7A95]">
          Choose what best describes your place
        </span>
      </div>

      <div className="category-scroll flex gap-2 py-2 px-2 rounded-2xl bg-[#111018] border border-[#2D2A37]">
        {CATEGORIES.map((cat) => {
          const active = value === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={`category-pill ${
                active ? "category-pill-active" : ""
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              <span className="text-xs md:text-sm">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {value && (
        <p className="mt-1 text-[11px] text-[#9D99B0]">
          Selected: <span className="text-[#E5E3F3] font-medium">{value}</span>
        </p>
      )}
    </div>
  );
}
