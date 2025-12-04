// components/HostSection.jsx
export default function HostSection({ host }) {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-16 mb-20">
      <h2 className="text-2xl font-semibold mb-5">Meet Your Host</h2>

      <div className="flex flex-col md:flex-row gap-6 items-center bg-[#18171F] border border-[#2D2A37] p-6 rounded-2xl shadow">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8C5FF6] to-[#F43F63] flex items-center justify-center text-3xl font-bold text-white">
          {host?.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="text-xl font-semibold">{host?.name}</p>
          <p className="text-sm text-[#9D99B0]">{host?.bio}</p>
          <p className="text-sm text-[#9D99B0] mt-1">
            Response rate: <span className="text-white font-semibold">{host?.responseRate}%</span>
          </p>
          {host?.isSuperhost && (
            <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-[#2A2638] text-[#C9C5D4] border border-[#8C5FF6]">
              ⭐ Superhost
            </span>
          )}
        </div>

        <button className="host-btn">Contact Host</button>
      </div>
    </section>
  );
}
