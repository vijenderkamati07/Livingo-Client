import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHomes } from "../../Services/userServices";
import SliderRow from "../../Components/HomePageComponents/SliderRow";
import HomeCard from "../../Components/HomePageComponents/HomeCard";

export default function Home() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHomes()
      .then((data) => {
        setHomes(Array.isArray(data) ? data : data?.homes || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const rows = useMemo(() => {
    if (!homes || homes.length === 0) return {};

    const byCategory = (cats) =>
      homes.filter((h) => cats.includes(h.category?.trim()));
    const justAdded = [...homes]
      .filter((h) => h.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      justAdded: justAdded.slice(0, 12),
      romantic: byCategory(["Villas", "Resort"]),
      budget: byCategory(["Rooms", "Hostels"]),
      apartments: byCategory(["Apartment"]),
      everything: homes,
    };
  }, [homes]);

  // NEW STATIC SECTION DATA
  const trendingDestinations = [
    {
      name: "Goa",
      tag: "Beach · Nightlife",
      stays: "48 stays",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1074&auto=format",
    },
    {
      name: "Manali",
      tag: "Mountains · Snow",
      stays: "32 stays",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&w=1200&q=80",
    },
    {
      name: "Udaipur",
      tag: "Lakes · Heritage",
      stays: "26 stays",
      image:
        "https://plus.unsplash.com/premium_photo-1697729844084-c03db2377161?q=80&w=1169&auto=format",
    },
    {
      name: "Rishikesh",
      tag: "River · Adventure",
      stays: "19 stays",
      image:
        "https://images.unsplash.com/photo-1650341259809-9314b0de9268?q=80&w=1170&auto=format",
    },
    {
      name: "Jaipur",
      tag: "Culture · Food",
      stays: "34 stays",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&w=1200&q=80",
    },
    {
      name: "Coorg",
      tag: "Coffee · Hills",
      stays: "21 stays",
      image:
        "https://images.unsplash.com/photo-1757702328394-a71ad4c417c2?q=80&w=1170&auto=format",
    },
  ];

  const loveReasons = [
    {
      title: "Handpicked, Verified Stays",
      desc: "Every LivinGo home is checked for real photos, safety, and host reliability.",
      icon: "✔",
    },
    {
      title: "Direct Host Connect",
      desc: "Contact hosts instantly for early check-ins, special requests or tips.",
      icon: "☎",
    },
    {
      title: "Transparent Pricing",
      desc: "No surprise fees. What you see before booking is what you pay.",
      icon: "₹",
    },
    {
      title: "Curated For Every Mood",
      desc: "From neon villas to temple-town rooms — find a stay that fits your vibe.",
      icon: "★",
    },
  ];

  const travellerStories = [
    {
      quote:
        "We booked a last-minute anniversary villa through LivinGo and the host lit candles before we arrived.",
      name: "Riya & Kunal",
      location: "Couple from Mumbai",
      stay: "Cliffside Pool Villa · Goa",
      rating: 4.9,
    },
    {
      quote:
        "The photos actually matched the room. Fast Wi-Fi and the host helped us plan a trek.",
      name: "Sanjay",
      location: "Remote worker · Bengaluru",
      stay: "Hill View Apartment · Manali",
      rating: 4.8,
    },
    {
      quote:
        "Cleanliness was a must since parents were traveling with us. LivinGo made it stupidly easy.",
      name: "The Sharma Family",
      location: "Family trip from Delhi",
      stay: "Heritage Haveli · Udaipur",
      rating: 5.0,
    },
  ];

  return (
    <div className="bg-[#0E0D13] text-[#E5E3F3] min-h-screen overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[72vh] flex flex-col justify-center items-center text-center px-6 mt-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_#8C5FF630,_transparent_55%),radial-gradient(circle_at_100%_100%,_#F43F6330,_transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.16] mix-blend-screen">
          <img
            src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&w=1600&q=90"
            className="w-full h-full object-cover"
            alt="Hero"
          />
        </div>

        <div className="relative max-w-3xl mx-auto space-y-6 animate-hero-fade">
          <p className="text-xs uppercase tracking-[0.24em] text-[#B5B1D0]">
            STAYS · VILLAS · RESORTS · ROOMS
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Where do you want to{" "}
            <span className="bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] bg-clip-text text-transparent">
              stay next
            </span>
            ?
          </h1>
          <p className="text-base md:text-lg text-[#C9C5D4] max-w-xl mx-auto">
            Scroll through curated rows of getaways — from neon villas to cozy hill homes.
          </p>

          <button
            onClick={() => navigate("/listed-homes")}
            className="px-8 py-3 bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] rounded-full text-white font-semibold shadow-lg hover:scale-[1.04] transition-all"
          >
            Explore all homes →
          </button>
        </div>
      </section>

      {/* SLIDER ROWS */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-12 pb-20">
        {loading && (
          <div className="home-skeleton-wrap">
            <div className="home-skeleton-bar"></div>
            <div className="home-skeleton-bar"></div>
            <div className="home-skeleton-bar"></div>
          </div>
        )}

        {!loading && homes.length > 0 && (
          <>
            {rows.justAdded?.length > 0 && (
              <SliderRow
                title="New on LivinGo"
                subtitle="Freshly added stays across India"
                items={rows.justAdded}
              />
            )}
            {rows.romantic?.length > 0 && (
              <SliderRow
                title="Villas & Resorts for Escapes"
                subtitle="Infinity pools, sunset balconies, and premium getaways"
                items={rows.romantic}
              />
            )}
            {rows.budget?.length > 0 && (
              <SliderRow
                title="Budget Rooms & Hostels"
                subtitle="Affordable stays for backpackers"
                items={rows.budget}
              />
            )}
            {rows.apartments?.length > 0 && (
              <SliderRow
                title="City Apartments & Workations"
                subtitle="High-speed Wi-Fi, comfort and natural light"
                items={rows.apartments}
              />
            )}
          </>
        )}
      </section>

      {/* TRENDING DESTINATIONS */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 pb-20">
        <h2 className="home-section-title">Trending destinations this month</h2>
        <p className="home-section-sub mb-6">
          Cities and hill towns LivinGo travellers are searching for right now.
        </p>
        <div className="trend-grid">
          {trendingDestinations.map((dest) => (
            <div
              key={dest.name}
              className="trend-card"
              style={{ backgroundImage: `url(${dest.image})` }}
            >
              <div className="trend-overlay" />
              <div className="trend-content">
                <span className="trend-tag">{dest.tag}</span>
                <h3 className="trend-title">{dest.name}</h3>
                <p className="trend-meta">{dest.stays}</p>
                <button className="trend-cta">Explore stays →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY PEOPLE LOVE LIVINGO */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-4 pb-20">
        <div className="text-center mb-7">
          <h2 className="home-section-title">Why travellers love LivinGo</h2>
          <p className="home-section-sub max-w-2xl mx-auto">
            A curated layer between you and stays that actually feel like an upgrade from home.
          </p>
        </div>

        <div className="love-grid">
          {loveReasons.map((item) => (
            <div key={item.title} className="love-card">
              <div className="love-icon">{item.icon}</div>
              <h3 className="love-title">{item.title}</h3>
              <p className="love-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORIES FROM TRAVELLERS */}
<section className="stories-shell px-4 sm:px-6 pt-9 pb-32">
  <div className="text-center mb-10">
    <p className="stories-tagline">REAL TRIPS · REAL MOMENTS · REAL PEOPLE</p>
    <h2 className="home-section-title mt-2">Stories from travellers</h2>
    <p className="home-section-sub max-w-xl mx-auto mt-2">
      Real moments from people who found their kind of stay on LivinGo.
    </p>
  </div>

  <div className="stories-track no-scrollbar pt-4 pb-4 pl-4">
    {travellerStories.map((story, idx) => (
      <article key={idx} className="story-card">
        <div className="story-rating">★ {story.rating}</div>
        <p className="story-quote">“{story.quote}”</p>

        <div className="story-footer">
          <div className="story-avatar">{story.name.charAt(0)}</div>
          <div>
            <p className="story-name">{story.name}</p>
            <p className="story-meta">
              {story.location} · <span>{story.stay}</span>
            </p>
          </div>
        </div>
      </article>
    ))}
  </div>
</section>

{/* PLAN YOUR NEXT ESCAPE — FINAL CTA SECTION */}
<section className="final-escape pt-10 px-4 sm:px-6 pb-28">
  <div className="max-w-[1100px] mx-auto text-center space-y-8">

    {/* 🔥 TAGLINE */}
    <p className="escape-tagline">
      FIND A STAY THAT MATCHES YOUR VIBE
    </p>

    <div >
      <h2 className="home-section-title">Plan your next escape</h2>
      <p className="home-section-sub max-w-xl mx-auto">
        Pick a vibe and explore stays that feel exactly how you want your trip to feel.
      </p>
    </div>

    <div className="escape-grid">
      <button className="escape-btn" onClick={() => navigate("/listed-homes?category=Villas")}>
        🏝 Villas
      </button>
      <button className="escape-btn" onClick={() => navigate("/listed-homes?category=Resort")}>
        🌅 Resorts
      </button>
      <button className="escape-btn" onClick={() => navigate("/listed-homes?category=Hostels")}>
        🎒 Hostels
      </button>
      <button className="escape-btn" onClick={() => navigate("/listed-homes?category=Rooms")}>
        💰 Budget Rooms
      </button>
    </div>

    <button
      onClick={() => navigate("/listed-homes")}
      className="escape-cta"
    >
      Explore all stays →
    </button>

  </div>
</section>

    </div>
  );
}
