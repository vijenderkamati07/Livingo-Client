import React from 'react'
import { Link, useNavigate } from "react-router-dom";


function Bookings({ title = "Booking page is under upgrade" }) {
  return (

    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#0E0D13]">

      {/* glowing blobs */}
      <div className="absolute w-[650px] h-[650px] bg-[#8C5FF6] opacity-[0.26] blur-[210px] -top-40 -left-32 rounded-full animate-pulse-slow" />
      <div className="absolute w-[550px] h-[550px] bg-[#F43F63] opacity-[0.22] blur-[190px] -bottom-32 -right-20 rounded-full animate-pulse-slow" />

      {/* card */}
      <div className="relative max-w-3xl w-full mx-auto rounded-[28px] px-10 py-16 backdrop-blur-xl
                      border border-white/10 bg-white/5 shadow-[0_0_60px_#00000070]
                      hover:shadow-[0_0_85px_#8C5FF620] transition-all duration-500">

        <p className="inline-block text-[11px] tracking-wider font-semibold uppercase bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-[#C9C5D4] mb-4">
          🚧 Page Under Construction
        </p>

        <h1 className="text-4xl md:text-[46px] font-extrabold leading-tight text-white mb-4">
          {title} <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8C5FF6] to-[#F43F63]">
            coming soon.
          </span>
        </h1>

        <p className="text-[#BDB9CB] max-w-2xl text-[15px] leading-relaxed mb-10">
          Our team is adding new premium features to enhance your experience.
          Stay tuned — the upgrade will be live shortly!
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/"
            className="px-7 py-3 rounded-xl text-white font-semibold shadow-[0_0_25px_#8C5FF620]
                       bg-gradient-to-r from-[#8C5FF6] to-[#F43F63]
                       hover:scale-[1.05] active:scale-[0.96] transition-all flex items-center gap-2">
            🏠 Back to Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="px-7 py-3 rounded-xl font-semibold text-[#E5E3F3]
                      bg-[#18171F] border border-[#2D2A37] hover:border-[#8C5FF6]
                      hover:bg-[#221F30] hover:scale-[1.03] active:scale-[0.96] transition-all flex items-center gap-2">
            ◀ Go Back
          </button>
        </div>
      </div>
    </div>
  );
}


export default Bookings
