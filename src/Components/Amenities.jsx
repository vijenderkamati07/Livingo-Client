
export default function Amenities({ amenities }) {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-14">
      <h2 className="text-2xl font-semibold mb-5">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities?.map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-[#18171F] border border-[#2D2A37] py-3 px-4 rounded-xl">
            <svg className="w-5 h-5 text-[#8C5FF6]" fill="none" stroke="currentColor">
              <path d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
