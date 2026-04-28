import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function HostProfile() {
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState({});
  const [listings, setListings] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, previewRes] = await Promise.all([
          fetch(`${API_BASE}/api/profile`, { credentials: "include" }),
          fetch(`${API_BASE}/api/host/profile-preview`, {
            credentials: "include",
          }),
        ]);

        const profileData = await profileRes.json();
        const previewData = await previewRes.json();

        setUser(profileData.data);
        setListings(previewData.listings || []);
        setRecentBookings(previewData.recentBookings || []);
        setPreview(previewData);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  const totalRevenue = recentBookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const totalBookings = recentBookings.length;
  const activeListings = listings.length;

  const heroImage =
    listings[0]?.photo
      ? `${API_BASE}/uploads/${listings[0].photo}`
      : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2";

  return (
    <div className="bg-[#0E0D13] text-[#E5E3F3] min-h-screen">

      {/* ================= HERO ================= */}
      <div className="relative h-[420px] overflow-hidden">

        <img
          src={heroImage}
          className="w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#8C5FF6]/50 via-[#8C5FF6]/30 to-[#F43F63]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D13] via-transparent to-transparent" />

        <div className="absolute bottom-10 left-10 max-w-xl">
          <div className="flex items-center gap-5 mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] flex items-center justify-center text-2xl font-bold shadow-xl">
              {user?.fullName?.[0] || "H"}
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                {user?.fullName || "Host"}
              </h2>
              <p className="text-[#C9C5D4]">
                {user?.location || "India"}
              </p>
            </div>
          </div>

          <p className="text-sm text-[#C9C5D4]">
            Manage your listings, track performance, and grow your hosting business.
          </p>
        </div>

        {/* CTA */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button className="px-4 py-2 bg-[#18171F] border border-[#2D2A37] rounded-xl hover:bg-[#2D2A37] transition cursor-pointer">
            View Dashboard
          </button>

          <button className="px-5 py-2 bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] rounded-xl hover:scale-105 transition cursor-pointer">
            + Add Home
          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-14">

        {/* KPI */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Revenue", value: `₹${totalRevenue}` },
            { label: "Bookings", value: totalBookings },
            { label: "Listings", value: activeListings },
            { label: "Rating", value: "4.8 ⭐" },
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

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Manage Listings",
            "View Bookings",
            "Analytics"
          ].map((action, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-[#8C5FF6]/20 to-[#F43F63]/20 p-6 rounded-2xl border border-[#2D2A37] hover:scale-105 transition cursor-pointer"
            >
              ⚡ {action}
            </div>
          ))}
        </div>

        {/* RECENT BOOKINGS */}
        <div>
          <h3 className="text-xl mb-6">Recent Bookings</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBookings.map((b) => (
              <div
                key={b._id}
                className="bg-[#18171F] rounded-2xl p-5 border border-[#2D2A37] hover:scale-105 transition cursor-pointer"
              >
                <h4 className="font-semibold">
                  Booking #{b._id.slice(-5)}
                </h4>

                <p className="text-sm text-[#A39EB8]">
                  Guests: {b.person}
                </p>

                <p className="text-sm">
                  ₹{b.totalPrice}
                </p>

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
            ))}
          </div>
        </div>

        {/* LISTINGS */}
        <div>
          <h3 className="text-xl mb-6">Your Listings</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {listings.map((l) => (
              <div
                key={l._id}
                className="bg-[#18171F] rounded-2xl overflow-hidden border border-[#2D2A37] hover:scale-105 transition cursor-pointer"
              >
                <img
                  src={`${API_BASE}/uploads/${l.photo}`}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4">
                  <h4>{l.houseName}</h4>
                  <p className="text-sm text-[#A39EB8]">
                    {l.location}
                  </p>
                  <p className="text-sm">₹{l.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA FOOTER */}
        <div className="flex justify-between items-center bg-[#18171F] p-6 rounded-2xl border border-[#2D2A37]">
          <p className="text-[#C9C5D4]">
            Want deeper insights? Go to your dashboard.
          </p>

          <button className="px-6 py-2 bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] rounded-xl hover:scale-105 transition cursor-pointer">
            Open Dashboard →
          </button>
        </div>

      </div>
    </div>
  );
}