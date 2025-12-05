import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
   <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#0E0D13]">

  {/* parallax glowing blobs */}
  <div className="absolute w-[650px] h-[650px] bg-[#8C5FF6] opacity-[0.28] blur-[210px] -top-40 -left-32 rounded-full animate-pulse-slow" />
  <div className="absolute w-[550px] h-[550px] bg-[#F43F63] opacity-[0.22] blur-[190px] -bottom-32 -right-20 rounded-full animate-pulse-slow" />

  {/* premium card container */}
  <div className="relative max-w-4xl w-full mx-auto rounded-[28px] px-10 py-16 backdrop-blur-xl
                  border border-white/10 bg-white/5 shadow-[0_0_60px_#00000070] 
                  hover:shadow-[0_0_85px_#8C5FF620] transition-all duration-500">

    {/* floating tags */}
    <div className="absolute -top-6 left-10 bg-[#18171F] border border-white/10 px-4 py-2 rounded-xl text-[13px] text-[#C9C5D4] font-medium shadow-[0_0_15px_#00000066]">
      🔍 Recommended stays nearby
    </div>
    <div className="absolute -bottom-6 right-10 bg-[#18171F] border border-white/10 px-4 py-2 rounded-xl text-[13px] text-[#C9C5D4] font-medium shadow-[0_0_15px_#00000066]">
      🌄 Hill cottages • ⭐ 4.8 rating
    </div>

    {/* heading */}
    <p className="inline-block text-[11px] tracking-wider font-semibold uppercase bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-[#D1CEDA] mb-4">
      404 — PAGE NOT FOUND
    </p>

    <h1 className="text-4xl md:text-[48px] font-extrabold leading-tight text-white mb-4">
      This stay has <br />
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8C5FF6] to-[#F43F63]">
        already checked out.
      </span>
    </h1>

    <p className="text-[#BDB9CB] max-w-2xl text-[15px] leading-relaxed mb-10">
      The place you’re trying to reach has either been removed, renamed, or never existed.  
      Let’s get you back to destinations that **actually exist and are waiting for you**.
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
