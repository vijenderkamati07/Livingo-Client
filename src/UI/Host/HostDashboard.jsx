import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip
} from "recharts";

import './HostDashboard.css';
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function HostDashboard() {
  const [summary, setSummary] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [propertyStats, setPropertyStats] = useState([]);
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 5;

  // ================= FETCH =================
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [summaryRes, recentRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/api/host/dashboard`, { credentials: "include" }),
        fetch(`${API_BASE}/api/host/recent-bookings`, { credentials: "include" }),
        fetch(`${API_BASE}/api/host/property-stats`, { credentials: "include" }),
      ]);

      const summaryData = await summaryRes.json();
      const recentData = await recentRes.json();
      const statsData = await statsRes.json();

      setSummary(summaryData);
      setRecentBookings(recentData || []);
      setPropertyStats(Array.isArray(statsData) ? statsData : []);

    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [page]);

  // ================= CHART DATA =================
  const chartData = recentBookings.map((b, i) => ({
    name: `B${i + 1}`,
    revenue: b.totalPrice
  }));

  // ================= CUSTOM TOOLTIP =================
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#18171F] border border-[#2D2A37] px-3 py-2 rounded-lg text-sm">
          <p>₹{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#0E0D13] text-[#E5E3F3] min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Host Dashboard</h1>

          <button
            onClick={fetchDashboard}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] hover:scale-105 transition cursor-pointer"
          >
            Refresh
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-400">Loading...</p>
        )}

        {!loading && summary && (
          <>
            {/* KPI */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[
                { label: "Revenue", value: `₹${summary.revenue}` },
                { label: "Bookings", value: summary.totalBookings },
                { label: "Confirmed", value: summary.confirmedBookings },
                { label: "Homes", value: summary.totalHomes }
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#18171F] p-5 rounded-2xl border border-[#2D2A37] hover:scale-105 hover:border-[#8C5FF6] transition cursor-pointer"
                >
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
                </div>
              ))}
            </div>

            {/* MIDDLE */}
            <div className="grid lg:grid-cols-3 gap-6 mb-12">

              {/* CHART */}
              <div className="lg:col-span-2 bg-[#18171F] p-6 rounded-2xl border border-[#2D2A37] hover:border-[#8C5FF6] transition cursor-pointer">
                <h2 className="mb-4 font-semibold">Revenue Overview</h2>

                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid stroke="#2D2A37" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8C5FF6"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* RECENT BOOKINGS */}
              <div className="bg-[#18171F] p-6 rounded-2xl border border-[#2D2A37] hover:border-[#8C5FF6] transition cursor-pointer">
                <h2 className="mb-4 font-semibold">Recent Bookings</h2>

                <div className="space-y-4 max-h-60 overflow-y-auto custom-scroll pr-2">
                  {recentBookings.map((b) => (
                    <div
                      key={b.bookingId}
                      className="flex justify-between text-sm hover:bg-[#0E0D13] p-2 rounded-lg transition cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{b.homeName}</p>
                        <p className="text-gray-400 text-xs">{b.guestName}</p>
                      </div>

                      <div className="text-right">
                        <p>₹{b.totalPrice}</p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            b.status === "confirmed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PROPERTY PERFORMANCE */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Property Performance</h2>

                {/* 🔥 NEW BUTTON */}
                <button
                  onClick={() => navigate("/host/host-homes")}
                  className="px-4 py-2 rounded-xl border border-[#2D2A37] hover:border-[#8C5FF6] transition cursor-pointer"
                >
                  View All Homes →
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propertyStats.map((home) => (
                  <div
                    key={home.homeId}
                    className="bg-[#18171F] p-5 rounded-2xl border border-[#2D2A37] hover:scale-105 hover:border-[#8C5FF6] transition cursor-pointer"
                  >
                    <h3 className="mb-3 font-semibold">
                      Home #{home.homeId.slice(-5)}
                    </h3>

                    <div className="text-sm space-y-2">
                      <p>Bookings: {home.totalBookings}</p>
                      <p>Revenue: ₹{home.totalRevenue}</p>
                    </div>

                    <div className="mt-4 h-2 bg-[#2D2A37] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#8C5FF6] to-[#F43F63]"
                        style={{
                          width: `${Math.min(home.totalBookings * 10, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}