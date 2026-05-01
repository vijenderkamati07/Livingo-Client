export default function BookingSuccessModal({ open, onClose, booking }) {
  if (!open) return null;

  // ❌ ERROR UI
  if (booking?.error) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-[#18171F] p-8 rounded-2xl w-[400px] text-center border border-[#2D2A37]">
          <h2 className="text-xl font-bold text-red-400 mb-3">
            ❌ Booking Failed
          </h2>

          <p className="text-[#A39EB8] mb-5">
            {booking.message}
          </p>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // ✅ SUCCESS UI
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#18171F] p-8 rounded-2xl w-[420px] text-center border border-[#2D2A37]">

        <h2 className="text-2xl font-bold mb-3">
          🎉 Booking Confirmed!
        </h2>

        <p className="text-[#A39EB8] mb-4">
          Your stay has been successfully booked.
        </p>

        <div className="text-sm text-[#C9C5D4] space-y-1 mb-6">
          <p><b>Guests:</b> {booking?.person}</p>
          <p><b>Total:</b> ₹{booking?.totalPrice}</p>
          <p>
            <b>From:</b>{" "}
            {booking?.startDate
              ? new Date(booking.startDate).toDateString()
              : "-"}
          </p>
          <p>
            <b>To:</b>{" "}
            {booking?.endDate
              ? new Date(booking.endDate).toDateString()
              : "-"}
          </p>
        </div>

        <button
          onClick={onClose}
          className="px-6 py-2 bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] rounded-xl hover:scale-105 transition"
        >
          View Bookings
        </button>
      </div>
    </div>
  );
}