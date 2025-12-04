import { useState } from "react";

export default function Reviews({ reviews }) {
  const [index, setIndex] = useState(0);
  const total = reviews?.length;

  const slide = (step) => {
    setIndex((prev) => (prev + step + total) % total);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 mt-16 text-center">
      <h2 className="text-2xl font-semibold mb-10">Guest Reviews</h2>

      <div className="relative max-w-3xl mx-auto review-slider">
        {reviews?.map((review, i) => {
          let pos = "hidden-card";
          if (i === index) pos = "center";
          else if (i === (index - 1 + total) % total) pos = "left";
          else if (i === (index + 1) % total) pos = "right";

          return (
            <div
              key={i}
              className={`reviewCard bg-[#18171F] border border-[#2D2A37] p-7 rounded-2xl shadow ${pos}`}
            >
              <p className="text-xl font-semibold mb-3 text-white">{review.name}</p>
              <p className="text-lg leading-relaxed text-[#C9C5D4]">{review.review}</p>
            </div>
          );
        })}

        <button
          onClick={() => slide(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 text-3xl text-[#8C5FF6] hover:text-white z-50"
        >❮</button>

        <button
          onClick={() => slide(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 text-3xl text-[#8C5FF6] hover:text-white z-50"
        >❯</button>
      </div>
    </section>
  );
}
