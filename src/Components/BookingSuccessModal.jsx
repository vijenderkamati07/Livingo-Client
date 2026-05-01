export default function BookingSuccessModal({ open, onClose, booking }) {
  if (!open) return null;

  if (booking?.error) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-[#18171F] p-6 rounded-xl text-center">
          <h2 className="text-xl font-bold text-red-400">❌ Booking Failed</h2>
          <p className="text-sm mt-2">{booking.message}</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 rounded">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#18171F] p-6 rounded-xl text-center">

        <h2 className="text-2xl font-bold mb-3">🎉 Booking Confirmed</h2>

        <p className="text-sm text-gray-300 mb-3">
          {booking.homeName}
        </p>

        <div className="text-sm space-y-1">
          <p>Guests: {booking.person}</p>
          <p>Total: ₹{booking.totalPrice}</p>
          <p>
            {new Date(booking.startDate).toDateString()} →{" "}
            {new Date(booking.endDate).toDateString()}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-5 py-2 bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] rounded"
        >
          View Bookings
        </button>
      </div>
    </div>
  );
}