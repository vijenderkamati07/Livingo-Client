import { useEffect, useState } from "react";
import { fetchUserBookings } from "../../Services/bookingService";
import { fetchFavourites } from "../../Services/userServices";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, bookingRes, favRes] = await Promise.all([
          fetch(`${API_BASE}/api/profile`, { credentials: "include" }),
          fetchUserBookings(),
          fetchFavourites(),
        ]);

        const profileData = await profileRes.json();

        setUser(profileData.data);
        setBookings(bookingRes.data || []);
        setFavorites(favRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  // ================= DERIVED =================
  const completed = bookings.filter((b) => b.status === "confirmed");
  const cancelled = bookings.filter((b) => b.status === "cancelled");
  const upcoming = bookings.filter(
    (b) => new Date(b.startDate) > new Date()
  );

  const totalSpent = completed.reduce((s, b) => s + b.totalPrice, 0);

  const lastTrip =
    completed.length > 0
      ? completed[completed.length - 1]
      : bookings[0];

  const filtered =
    filter === "upcoming"
      ? upcoming
      : filter === "completed"
      ? completed
      : filter === "cancelled"
      ? cancelled
      : bookings;

  // ================= UI =================
  return (
    <div className="bg-[#0E0D13] text-[#E5E3F3] min-h-screen">

      {/* ================= HERO ================= */}
      <div className="relative h-[420px] overflow-hidden">

        <img
          src={
            lastTrip?.homeId?.photo
              ? `${API_BASE}/uploads/${lastTrip.homeId.photo}`
              : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
          }
          className="w-full h-full object-cover scale-105"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#8C5FF6]/50 via-[#8C5FF6]/30 to-[#F43F63]/50" />

        {/* Dark fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D13] via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute bottom-10 left-10 max-w-xl">

          <div className="flex items-center gap-5 mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] flex items-center justify-center text-2xl font-bold shadow-xl">
              {user?.fullName?.[0] || "U"}
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                {user?.fullName || "Guest User"}
              </h2>
              <p className="text-[#C9C5D4]">
                {user?.location || "India"}
              </p>
            </div>
          </div>

          <p className="text-sm text-[#C9C5D4] max-w-md leading-relaxed">
            Discover your journey, revisit your favorite stays, and plan your next unforgettable experience.
          </p>
        </div>

        <button className="absolute top-6 right-6 px-5 py-2 bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] rounded-xl hover:scale-105 transition cursor-pointer">
          Explore
        </button>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-14">

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Trips", value: bookings.length },
            { label: "Completed", value: completed.length },
            { label: "Cancelled", value: cancelled.length },
            { label: "Spent", value: `₹${totalSpent}` },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-[#18171F] p-6 rounded-2xl border border-[#2D2A37] hover:scale-105 hover:border-[#8C5FF6] transition cursor-pointer"
            >
              <p className="text-sm text-[#A39EB8]">{s.label}</p>
              <h3 className="text-2xl font-bold mt-2">{s.value}</h3>
            </div>
          ))}
        </div>

        {/* FILTER */}
        <div className="flex gap-4 flex-wrap">
          {["all", "upcoming", "completed", "cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl transition cursor-pointer ${
                filter === f
                  ? "bg-[#8C5FF6]"
                  : "bg-[#18171F] hover:bg-[#2D2A37]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* BOOKINGS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b) => (
            <div
              key={b._id}
              className="group bg-[#18171F] rounded-2xl border border-[#2D2A37] overflow-hidden hover:scale-[1.04] transition cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    b?.homeId?.photo
                      ? `${API_BASE}/uploads/${b.homeId.photo}`
                      : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
                  }
                  className="h-44 w-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold">
                  {b?.homeId?.houseName || "Stay"}
                </h3>

                <p className="text-xs text-[#A39EB8]">
                  {b?.homeId?.location || "India"}
                </p>

                <p className="text-xs">
                  {new Date(b.startDate).toDateString()}
                </p>

                <div className="flex justify-between items-center">
                  <span>₹{b.totalPrice}</span>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      b.status === "confirmed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAVORITES */}
        <div>
          <h3 className="text-xl mb-6">Your Favorites</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {favorites.map((f) => (
              <div
                key={f._id}
                className="bg-[#18171F] rounded-2xl p-5 border border-[#2D2A37] hover:scale-105 transition cursor-pointer"
              >
                <h4>{f.houseName}</h4>
                <p className="text-sm text-[#A39EB8]">₹{f.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="bg-[#18171F] p-6 rounded-2xl border border-[#2D2A37]">
          <h3 className="mb-4 font-semibold">Activity</h3>

          {bookings.slice(0, 5).map((b) => (
            <div
              key={b._id}
              className="flex justify-between text-sm mb-2 hover:text-white transition cursor-pointer"
            >
              <span>{b?.homeId?.houseName || "Stay"}</span>
              <span>₹{b.totalPrice}</span>
            </div>
          ))}
        </div>

        {/* ACHIEVEMENTS */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "First Trip Completed",
            "Stayed in 3 Cities",
            "Spent ₹50K+",
          ].map((a, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-[#8C5FF6]/20 to-[#F43F63]/20 p-5 rounded-2xl border border-[#2D2A37] hover:scale-105 transition cursor-pointer"
            >
              🏆 {a}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}