import { useEffect, useState, useContext } from "react";
import { fetchFavourites, removeFavourite } from "../../Services/userServices.js";
import { Link, useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContext } from "../../Context/AuthContext";

export default function Favourite() {
  const [favHomes, setFavHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);   // 🔥 we need this

  useEffect(() => {
    const loadFavs = async () => {
      try {
        const data = await fetchFavourites();

        if (data?.unauthorized) {
          // 🔥 backend says session is invalid -> frontend must believe it
          setUser(null);
          navigate("/login");
          return;
        }

        setFavHomes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load favourites:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFavs();
  }, [navigate, setUser]);



const handleRemove = async (homeId) => {
  const res = await removeFavourite(homeId);
  if (!res.success) return;       // now this works correctly

  setRemovingId(homeId);
  setTimeout(() => {
    setFavHomes(prev => prev.filter(h => h._id !== homeId));
    setRemovingId(null);
  }, 350);
};



  return (
    <main className="min-h-screen bg-[#0E0D13] text-[#E5E3F3] flex flex-col">
      {/* HERO */}
      <section className="fav-hero w-full px-6 md:px-16 pt-24 pb-14">
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-sm text-[#9F99B8] mb-3">
            Wishlist · LivinGo
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            It&apos;s time to escape —{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8C5FF6] to-[#F43F63]">
              the homes you saved are waiting
            </span>
            .
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#A9A3C5] max-w-xl">
            A curated set of stays you chose — scroll, compare, and let one of
            them become your next destination.
          </p>

          {favHomes.length > 0 && !loading && (
            <p className="mt-6 text-xs sm:text-sm text-[#C3BEDB]">
              You&apos;ve saved{" "}
              <span className="font-semibold text-[#F43F63]">
                {favHomes.length} home{favHomes.length > 1 ? "s" : ""}
              </span>{" "}
              — explore and book when it feels right.
            </p>
          )}

          <button
            onClick={() => navigate("/listed-homes")}
            className="ui-action host-btn mt-6 inline-flex"
          >
            Discover More Homes
          </button>
        </div>
      </section>

      {/* GRID CONTENT */}
      <section className="px-6 md:px-16 pb-20 fav-grid-bg">
        <div className="max-w-6xl mx-auto pt-6 md:pt-8">
          {/* SKELETON WHILE LOADING */}
          {loading && (
            <SkeletonTheme baseColor="#18171F" highlightColor="#2D2A37">
              <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="skeleton-block rounded-2xl p-0">
                    <Skeleton height={220} className="!rounded-t-2xl" />
                    <div className="p-4 space-y-3">
                      <Skeleton width="70%" height={20} />
                      <Skeleton width="50%" height={16} />
                      <Skeleton height={14} count={2} />
                      <Skeleton width="50%" height={20} />
                      <Skeleton width="90%" height={36} />
                    </div>
                  </div>
                ))}
              </div>
            </SkeletonTheme>
          )}

          {/* GRID LIST */}
          {!loading && favHomes.length > 0 && (
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {favHomes.map((home) => (
                <article
                  key={home._id}
                  className={`fav-card overflow-hidden relative ${
                    removingId === home._id ? "fav-remove-anim" : ""
                  }`}
                >
                  <Link
                    to={`/home/${home._id}`}
                    className="block relative aspect-[4/3] overflow-hidden"
                  >
                    <img
                      src={`http://localhost:3000/uploads/${home.photo}`}
                      alt={home.houseName}
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0E0D13cc] to-transparent" />
                  </Link>

                  <div className="p-4 flex flex-col gap-4">
                    <div>
                      <Link
                        to={`/home/${home._id}`}
                        className="text-xl font-semibold hover:text-[#F43F63] transition"
                      >
                        {home.houseName}
                      </Link>
                      <p className="mt-1 text-xs text-[#A9A3C5]">
                        {home.location}
                      </p>
                    </div>

                    <p className="text-sm text-[#9F99B8] line-clamp-3">
                      {home.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <p className="text-xs text-[#A9A3C5]">From</p>
                        <p className="text-lg font-semibold">
                          ₹{home.price}
                          <span className="text-xs text-[#A9A3C5]">
                            {" "}
                            /night
                          </span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemove(home._id)}
                        className="ui-action text-xs px-3 py-2 rounded-xl border border-[#F97373] text-[#F97373] hover:bg-[#F9737315]"
                      >
                        Remove
                      </button>
                    </div>

                    <button
                      onClick={() => navigate(`/home/${home._id}`)}
                      className="ui-action host-btn w-full mt-1 justify-center"
                    >
                      Book this Stay
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && favHomes.length === 0 && (
            <div className="empty-wish mt-10 flex flex-col items-center text-center gap-6">
              <img
                src="https://media.tenor.com/9kFjePt6wzEAAAAi/hotel-trip.gif"
                alt="Empty"
                className="w-52 h-52 rounded-full object-cover shadow-[0_0_40px_rgba(0,0,0,0.8),0_0_60px_rgba(140,95,246,0.35)]"
              />
              <h2 className="text-2xl font-semibold">
                Your escape list is empty
              </h2>
              <p className="text-sm text-[#A9A3C5] max-w-md">
                Explore beautiful stays around the world and save your
                favourites for your next getaway.
              </p>
              <button
                onClick={() => navigate("/listed-homes")}
                className="fav-btn mt-1"
              >
                Discover Homes
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
