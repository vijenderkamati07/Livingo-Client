import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { deleteHomeService, fetchHostHomes } from "../../Services/hostServices";
import SortDropdown from "../../Components/SortDropdown";
import StatusDropdown from "../../Components/StatusDropdown";

export default function HostHomes() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 6;

  useEffect(() => {
    let isMounted = true;

    const loadHomes = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchHostHomes();
        if (isMounted) {
          setHomes(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load your homes. Please try again.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadHomes();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(homes.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleHomes = homes.slice(startIndex, startIndex + PAGE_SIZE);

const handleDelete = async (homeId) => {
  if (!window.confirm("Are you sure you want to delete this listing?")) return;

  try {
    await deleteHomeService(homeId);
    setHomes((prev) => prev.filter((h) => h._id !== homeId)); // remove instantly from UI
  } catch (error) {
    console.error(error);
    alert("❌ Failed to delete home");
  }
};


  const handleToggleStatus = (homeId, currentStatus) => {
    // hook your status toggle API here (Active/Paused)
    console.log("Toggle status:", homeId, "current:", currentStatus);
  };

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const hostHomesCount = homes.length;

  return (
  <main className="bg-[#0E0D13] text-[#E5E3F3] min-h-screen flex flex-col">

    {/* HEADER */}
    <section className="max-w-6xl mx-auto px-6 pt-10 pb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Your LivinGo homes
          </h1>
          <p className="mt-2 text-sm md:text-base text-[#C9C5D4]">
            Manage your listings, track performance, and keep your best stays live.
          </p>
        </div>

        <div className="flex items-center gap-3 justify-start md:justify-end">
          <button
            type="button"
            disabled
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#F97373]/70 text-[#FCA5A5] text-sm font-medium
                       hover:bg-[#3B1B23] hover:border-[#F97373] hover:text-white
                       transition-all duration-300 cursor-not-allowed opacity-40"
          >
            Delete selected
          </button>

          <Link
            to="/host/add-home"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-gradient-to-r from-[#8C5FF6] to-[#F43F63]
                       text-sm md:text-base font-semibold text-white
                       shadow-lg shadow-[#8C5FF630]
                       hover:shadow-[#8C5FF660] hover:scale-[1.03] active:scale-[0.97]
                       transition-all duration-300"
          >
            <span className="text-lg">＋</span>
            <span>Add new home</span>
          </Link>
        </div>
      </div>
    </section>

    {/* FILTER + LIST WRAPPER WITH GRADIENT */}
    <section className="max-w-7xl mx-auto px-6 pb-14 flex-1">
      <div className="rounded-2xl bg-gradient-to-b from-[#15141c] to-[#0E0D13] p-6">

        {/* FILTER BAR */}
        <div className="w-full mb-8 bg-[#18171F] border border-[#2D2A37] rounded-2xl px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2 text-xs md:text-sm text-[#9D99B0]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E]" />
            <span>
              You have{" "}
              <span className="font-semibold text-[#E5E3F3]">
                {hostHomesCount}
              </span>{" "}
              active listing{hostHomesCount !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-start md:justify-end text-xs md:text-sm">
            <SortDropdown value={"Sort By"} />
            <StatusDropdown value={"Filter By"} />
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 bg-[#3B1B23] border border-[#F97373] text-[#FED7D7] text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* LOADING SKELETON */}
        {loading && (
          <SkeletonTheme baseColor="#18171F" highlightColor="#2D2A37">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="mb-7 rounded-2xl border border-[#2D2A37] overflow-hidden shadow-md bg-[#18171F] flex flex-col md:flex-row min-h-[260px]"
              >
                <div className="md:w-1/2 relative">
                  <Skeleton className="w-full h-full md:min-h-[260px] aspect-[16/10]" />
                </div>
                <div className="md:w-1/2 p-5 flex flex-col justify-between">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-start gap-3">
                      <Skeleton width="65%" height={26} />
                      <Skeleton width={85} height={24} />
                    </div>
                    <Skeleton width="55%" height={14} />
                    <Skeleton count={2} height={12} />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 mb-4">
                    <Skeleton width={70} height={20} />
                    <Skeleton width={70} height={20} />
                    <Skeleton width={75} height={20} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Skeleton width={60} height={32} />
                    <Skeleton width={60} height={32} />
                    <Skeleton width={75} height={32} />
                  </div>
                </div>
              </div>
            ))}
          </SkeletonTheme>
        )}

        {/* EMPTY STATE */}
        {!loading && homes.length === 0 && (
          <div className="mt-8 bg-[#18171F] border border-dashed border-[#2D2A37] rounded-2xl px-6 py-10 text-center text-[#C9C5D4]">
            <p className="text-lg font-semibold mb-2">
              You haven’t listed any homes yet.
            </p>
            <p className="text-sm mb-5">
              Start hosting to unlock potential earnings and visibility on LivinGo.
            </p>
            <Link
              to="/host/add-home"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                         bg-gradient-to-r from-[#8C5FF6] to-[#F43F63]
                         text-sm font-semibold text-white cursor-pointer
                         hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              Start hosting
            </Link>
          </div>
        )}

        {/* LIST */}
        {!loading && homes.length > 0 && (
          <>
            {visibleHomes.map((home) => {
              const status = home.status || "Active";
              const views = home.views || 0;
              const favourites = home.favouritesCount || 0;
              const bookings = home.bookingsCount || 0;
              const estRevenue = (home.price || 0) * 15;

              return (
                <article
                  key={home._id}
                  className="group bg-[#18171F] mb-7 border border-[#2D2A37] rounded-2xl overflow-hidden
                             shadow-md hover:shadow-xl hover:shadow-[#8C5FF620]
                             transition-all duration-300 flex flex-col md:flex-row cursor-pointer"
                >
                  {/* IMAGE */}
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img
                      src={`https://livingo-backend.onrender.com/uploads/${home.photo}`}
                      alt={home.houseName}
                      className="w-full h-full object-cover md:h-full aspect-[16/10] group-hover:scale-[1.03] transition-transform duration-500"
                    />

                    {/* STATUS BADGE */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-[#0E0D13]/80 border ${
                          status === "Active"
                            ? "border-[#22C55E80] text-[#BBF7D0]"
                            : "border-[#FACC1580] text-[#FEF3C7]"
                        } flex items-center gap-2`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            status === "Active" ? "bg-[#22C55E]" : "bg-[#FACC15]"
                          }`}
                        />
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="md:w-1/2 p-5 flex flex-col justify-between text-left gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl md:text-2xl font-semibold text-white line-clamp-1">
                          {home.houseName}
                        </h3>
                        <div className="text-right shrink-0">
                          <p className="text-lg md:text-xl font-bold text-[#9FE4C7]">
                            ₹{home.price}
                            <span className="text-xs text-[#9D99B0] font-normal">
                              / night
                            </span>
                          </p>
                          <p className="text-[11px] text-[#9D99B0]">
                            Est. monthly:{" "}
                            <span className="text-[#C4F1E0] font-semibold">
                              ₹{estRevenue}
                            </span>
                          </p>
                        </div>
                      </div>

                      <p className="text-xs md:text-sm text-[#C9C5D4] flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-[#B492FF]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                      </svg>
                      <span className="truncate">{home.location}</span>
                    </p>

                      <p className="text-xs md:text-sm text-[#9D99B0] line-clamp-2">
                        {home.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] md:text-xs text-[#A29CB8] bg-[#111018] rounded-xl px-3 py-2">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                        <span className="font-semibold text-[#E5E3F3]">{views}</span>
                        views
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#F97373]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="font-semibold text-[#E5E3F3]">{favourites}</span>
                        favourites
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#FACC15]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M5 11h14M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
                        </svg>
                        <span className="font-semibold text-[#E5E3F3]">{bookings}</span>
                        bookings
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-[11px] text-[#75708C]">
                        Last updated: <span className="font-medium">recently</span>
                      </span>

                      <div className="flex items-center gap-2 text-xs">
                        <Link
                          to={`/home/${home._id}`}
                          className="px-3 py-1.5 rounded-lg border border-transparent text-[#C9C5D4]
                                     hover:border-[#4B3A88] hover:bg-[#181329] cursor-pointer
                                     transition-all duration-200"
                        >
                          View
                        </Link>

                        <Link
                          to={`/host/edit/${home._id}?editing=true`}
                          className="px-3 py-1.5 rounded-lg border border-[#3B82F6]/60 text-[#BFDBFE]
                                     hover:bg-[#1D2A44] hover:border-[#3B82F6] cursor-pointer
                                     transition-all duration-200"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleToggleStatus(home._id, status)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                            status === "Active"
                              ? "border-[#22C55E]/70 text-[#BBF7D0] hover:bg-[#052E16]"
                              : "border-[#FACC15]/70 text-[#FEF3C7] hover:bg-[#3B2F0B]"
                          }`}
                        >
                          {status === "Active" ? "Pause" : "Activate"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(home._id)}
                          className="px-3 py-1.5 rounded-lg border border-[#F97373]/70 text-[#FCA5A5]
                                     hover:bg-[#3B1B23] hover:border-[#F97373] hover:text-white
                                     text-xs font-medium cursor-pointer transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between text-xs md:text-sm text-[#A9A3C5]">
                <span>
                  Page{" "}
                  <span className="font-semibold text-[#E5E3F3]">{currentPage}</span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#E5E3F3]">{totalPages}</span>
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-[#2D2A37] text-[#C9C5D4]
                               hover:bg-[#18171F] disabled:opacity-40 disabled:cursor-default
                               transition-all duration-200"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-[#2D2A37] text-[#C9C5D4]
                               hover:bg-[#18171F] disabled:opacity-40 disabled:cursor-default
                               transition-all duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  </main>
);

}
