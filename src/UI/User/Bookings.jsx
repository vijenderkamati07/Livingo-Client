import { useEffect, useState } from "react";
import { fetchUserBookings, cancelMyBooking } from "../../Services/bookingService";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      // differentiate initial load vs refresh
      if (bookings.length > 0) setRefreshing(true);
      else setLoading(true);

      const res = await fetchUserBookings();
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const confirmCancel = async () => {
    try {
      await cancelMyBooking(selectedBooking._id);

      // update local state (no refetch)
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking._id
            ? { ...b, status: "cancelled" }
            : b
        )
      );

      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="bg-[#0B0B0F] min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">

        {/* Title + Refresh */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            My Bookings
          </h1>

          <button
            onClick={loadBookings}
            className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 active:scale-95 transition"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Loading (only first load) */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse h-24 bg-[#12121A] rounded-xl"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && bookings.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-lg">No bookings yet</p>
            <p className="text-sm mt-2">
              Start exploring and book your first stay
            </p>
          </div>
        )}

        {/* Booking List */}
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-[#12121A] border border-[#1E1E2A] rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-4 hover:scale-[1.01] transition duration-300"
            >
              {/* Left */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">
                  {booking.homeId?.houseName}
                </h2>

                <p className="text-sm text-gray-400">
                  {booking.homeId?.location}
                </p>

                <p className="text-sm text-gray-400">
                  {new Date(booking.startDate).toDateString()} →{" "}
                  {new Date(booking.endDate).toDateString()}
                </p>

                <p className="text-sm">
                  ₹{booking.totalPrice}
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col justify-between items-end gap-3">

                {/* Status */}
                <span
                  className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>

                {/* Cancel Button */}
                {booking.status === "confirmed" && (
                  <button
                    onClick={() => handleCancelClick(booking)}
                    className="border border-red-500 text-red-400 px-4 py-1.5 rounded-xl hover:bg-red-500/10 transition active:scale-95"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#12121A] border border-[#1E1E2A] rounded-2xl p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Cancel Booking?
            </h2>

            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to cancel this booking?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="border border-[#1E1E2A] px-4 py-2 rounded-xl hover:bg-[#12121A]"
              >
                No
              </button>

              <button
                onClick={confirmCancel}
                className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-xl text-white hover:opacity-90 active:scale-95"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;