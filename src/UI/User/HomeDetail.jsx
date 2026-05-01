import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { fetchHomeDetails, addFavourite } from "../../Services/userServices";
import Amenities from "../../Components/Amenities.jsx";
import Reviews from "../../Components/Reviews.jsx";
import HostSection from "../../Components/HostSection.jsx";
import { createNewBooking } from "../../Services/bookingService.js";
import BookingCard from "../../Components/BookingCard.jsx";
import BookingSuccessModal from "../../Components/BookingSuccessModal.jsx";

export default function HomeDetail() {
  const { homeId } = useParams();
  const navigate = useNavigate();

  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  // ❤️ Favourite
  const handlerAddFavourite = async () => {
    try {
      await addFavourite(homeId);
    } catch (error) {
      console.error("Failed to add to favourites:", error);
    }
  };

  // 🔥 BOOKING HANDLER (FIXED)
  const handleBooking = async () => {
    try {
      if (!startDate || !endDate) {
        setBookingData({
          error: true,
          message: "Please select check-in and check-out dates",
        });
        setShowModal(true);
        return;
      }

      if (endDate <= startDate) {
        setBookingData({
          error: true,
          message: "End date must be after start date",
        });
        setShowModal(true);
        return;
      }

      setBookingLoading(true);

      const result = await createNewBooking({
        homeId,
        startDate,
        endDate,
        person: guestCount,
      });

      if (result.success) {
        // ✅ FIX: Use returned backend data
        setBookingData({
          ...result.data,
          homeName: home.houseName,
        });
      } else {
        setBookingData({
          error: true,
          message: result.error || "Booking failed",
        });
      }

      setShowModal(true);
    } catch (err) {
      console.error(err);
      setBookingData({
        error: true,
        message: "Something went wrong. Try again.",
      });
      setShowModal(true);
    } finally {
      setBookingLoading(false);
    }
  };

  // FETCH HOME
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await fetchHomeDetails(homeId);
        if (!isMounted) return;

        setHome(data);

        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 150);
      } catch (e) {
        console.error(e);
        if (isMounted) setLoading(false);
      }
    })();

    return () => (isMounted = false);
  }, [homeId]);

  // MAP + DATE
  useEffect(() => {
    if (!home || loading) return;

    const map = L.map("map").setView([home.lat, home.lng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    L.marker([home.lat, home.lng]).addTo(map).bindPopup(home.houseName);

    const checkin = flatpickr("#checkin", {
      dateFormat: "Y-m-d",
      minDate: "today",
      onChange: (dates) => {
        setStartDate(dates[0]);
        checkout.set("minDate", dates[0]);
      },
    });

    const checkout = flatpickr("#checkout", {
      dateFormat: "Y-m-d",
      minDate: "today",
      onChange: (dates) => {
        setEndDate(dates[0]);
      },
    });

    return () => map.remove();
  }, [home, loading]);

  return (
    <main className="bg-[#0E0D13] text-[#E5E3F3] min-h-screen pt-8 pb-20">

      {loading && (
        <SkeletonTheme baseColor="#18171F" highlightColor="#2D2A37" />
      )}

      {!loading && home && (
        <>
          <div className="home-fade show">

            {/* YOUR EXISTING UI (UNCHANGED) */}

            <section className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                {/* content */}
              </div>

              <BookingCard
                home={home}
                guestCount={guestCount}
                setGuestCount={setGuestCount}
                startDate={startDate}
                endDate={endDate}
                handleBooking={handleBooking}
                loading={bookingLoading}
              />
            </section>

            <Amenities amenities={home.amenities} />
            <Reviews reviews={home.reviews} />
            <HostSection host={home.host} />
          </div>

          {/* ✅ MODAL FIX */}
          <BookingSuccessModal
            open={showModal}
            onClose={() => {
              setShowModal(false);
              if (!bookingData?.error) {
                navigate("/bookings");
              }
            }}
            booking={bookingData}
          />
        </>
      )}
    </main>
  );
}