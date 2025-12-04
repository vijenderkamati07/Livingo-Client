import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { fetchHomeDetails, addFavourite } from "../../Services/userServices.js";
import Sidebar from "../../Components/Sidebar.jsx";
import Amenities from "../../Components/Amenities.jsx";
import Reviews from "../../Components/Reviews.jsx";
import HostSection from "../../Components/HostSection.jsx";

export default function HomeDetail() {
  const { homeId } = useParams();
  const navigate = useNavigate();

  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guestCount, setGuestCount] = useState(1);

  const handlerAddFavourite = async () => {
    try {
      await addFavourite(homeId);
      navigate("/favourite");
    } catch (error) {
      console.error("Failed to add to favourites:", error);
    }
  };

  // FETCH DATA
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await fetchHomeDetails(homeId);
        if (!isMounted) return;
        setHome(data);
        // tiny delay avoids flash when swapping skeleton -> real UI
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 150);
      } catch (e) {
        console.error("Failed to fetch home details", e);
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [homeId]);

  // MAP + DATE PICKER
  useEffect(() => {
    if (!home || loading) return;

    const mapContainer = document.getElementById("map");
    if (!mapContainer) return; 

    if (mapContainer._leaflet_id) {
      mapContainer._leaflet_id = null;
    }

    const map = L.map("map").setView([home.lat, home.lng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );
    L.marker([home.lat, home.lng]).addTo(map).bindPopup(home.houseName);

    const checkout = flatpickr("#checkout", {
      dateFormat: "d-m-Y",
      minDate: "today",
    });

    flatpickr("#checkin", {
      dateFormat: "d-m-Y",
      minDate: "today",
      onChange: (dates) => checkout.set("minDate", dates[0]),
    });

    return () => {
      map.remove();
    };
  }, [home, loading]);

  return (
    <main className="bg-[#0E0D13] text-[#E5E3F3] min-h-screen pt-8 pb-20">
      {/* SKELETON VIEW (same style as host homes) */}
      {loading && (
        <SkeletonTheme baseColor="#18171F" highlightColor="#2D2A37">
          <section className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl overflow-hidden">
              <Skeleton height={420} className="w-full h-full" />
              <div className="grid grid-cols-2 gap-4 h-[420px]">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} height={200} className="w-full h-full" />
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-4">
              <Skeleton width={120} height={30} />
              <Skeleton width="70%" height={32} />
              <Skeleton count={3} height={18} />
              <Skeleton height={260} />
            </div>

            <div className="w-full lg:w-80 space-y-4">
              <Skeleton height={130} />
              <Skeleton height={50} />
              <Skeleton height={45} />
              <Skeleton height={45} />
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 mt-14 grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} height={48} />
              ))}
          </section>

          <section className="max-w-6xl mx-auto px-6 mt-14">
            <Skeleton height={220} />
          </section>
        </SkeletonTheme>
      )}

      {/* REAL UI */}
      {!loading && home && (
        <div className="home-fade show">
          {/* GALLERY */}
          <section className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl overflow-hidden">
              <img
                src={`https://livingo-backend.onrender.com/uploads/${home.photo[0]}`}
                className="h-[420px] w-full object-cover rounded-xl"
                alt={home.houseName}
              />
              <div className="grid grid-cols-2 gap-4 h-[420px]">
                {home.photo.slice(1, 5).map((img, i) => (
                  <img
                    key={i}
                    src={`https://livingo-backend.onrender.com/uploads/${img}`}
                    className="w-full h-full object-cover rounded-xl cursor-pointer"
                    alt={`gallery-${i}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* CONTENT + SIDEBAR */}
          <section className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <span className="px-4 py-1 text-sm rounded-full bg-[#1A1824] border border-[#8C5FF6] text-[#C9C5D4]">
                {home.category}
              </span>

              <h1 className="text-4xl font-extrabold mt-4 mb-2">
                {home.houseName}
              </h1>

              <div className="flex items-center justify-between mt-3 mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-2 text-lg text-[#C9C5D4]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[#8C5FF6] shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </svg>
                  <span>{home.location}</span>
                </div>

                <button className="fav-btn" onClick={handlerAddFavourite}>
                  ❤️ Add to Favourite
                </button>
              </div>

              <h2 className="text-2xl font-semibold mb-3">About this place</h2>
              <p className="text-lg mb-8">{home.description}</p>

              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div id="map" className="h-64 w-full rounded-xl shadow-xl" />
            </div>

            <Sidebar
              home={home}
              guestCount={guestCount}
              setGuestCount={setGuestCount}
            />
          </section>

          <Amenities amenities={home.amenities} />
          <Reviews reviews={home.reviews} />
          <HostSection host={home.host} />
        </div>
      )}
    </main>
  );
}
