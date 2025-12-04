import { useEffect, useRef } from "react";
import HomeCard from "./HomeCard";

export default function SliderRow({ title, subtitle, items }) {
  const rowRef = useRef(null);
  const isHovered = useRef(false);

  // Auto-slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered.current) {
        const row = rowRef.current;
        if (row) {
          row.scrollBy({ left: row.clientWidth * 0.85, behavior: "smooth" });
        }
      }
    }, 3000); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  const scroll = (dir) => {
    const row = rowRef.current;
    if (row) row.scrollBy({ left: row.clientWidth * 0.85 * dir, behavior: "smooth" });
  };

return (
  <section className="mb-14">
    <div className="flex items-baseline justify-between mb-3 px-1">
      <div>
        <h2 className="row-title">{title}</h2>
        {subtitle && <p className="row-subtitle">{subtitle}</p>}
      </div>
    </div>

    <div
      className="relative slider-hover-zone"
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      {/* Fade edges */}
      <div className="fade-left" />
      <div className="fade-right" />

      {/* Track */}
      <div
        ref={rowRef}
        className="slider-track no-scrollbar"
        onScroll={(e) => (e.currentTarget.dataset.scroll = e.currentTarget.scrollLeft)}
        data-scroll="0"
        style={{ overflowX: "auto", scrollBehavior: "smooth" }}
      >
        {items.map((home, index) => (
          <HomeCard key={home._id} home={home} index={index} />
        ))}
      </div>

      {/* Half-circle premium arrows */}
      <button className="lux-arrow-left lux-arrow" onClick={() => scroll(-1)}>❮</button>
      <button className="lux-arrow-right lux-arrow" onClick={() => scroll(1)}>❯</button>
    </div>
  </section>
);

}