// src/Pages/User/HomeList.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { fetchListedHomes } from  "../../Services/userServices";
import { useSearchParams } from "react-router-dom";
import HomeCard from "../../Components/HomePageComponents/HomeCard"
import useDebouncedValue from "../../CustomHooks/userDebouncedValue";

// ---------- Top bar: Search + Sort ----------
function SearchAndSortBar({
  searchInput,
  onSearchChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="w-full bg-[#0F0E16]/90 backdrop-blur border border-[#252233] rounded-2xl px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
      {/* Search */}
      <div className="flex-1 flex items-center gap-2 bg-[#18171F] border border-[#2D2A37] rounded-xl px-3 py-2">
        <span className="text-[#8C5FF6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.5 15.5L20 20"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle
              cx="11"
              cy="11"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </span>
        <input
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by city or state…"
          className="flex-1 bg-transparent outline-none text-sm text-[#E5E3F3] placeholder:text-[#6E6782]"
        />
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 justify-end">
        <span className="text-xs text-[#9D99B0]">Sort by</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-[#18171F] border border-[#2D2A37] text-xs sm:text-sm text-[#E5E3F3] rounded-xl px-3 py-2 outline-none hover:border-[#8C5FF6] transition"
        >
          <option value="recent">Most Recent</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

// ---------- Left sidebar filters ----------
function FiltersSidebar({
  stateFilter,
  onStateChange,
  category,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
  onReset,
}) {
  return (
    <aside className="w-full md:w-[28%] lg:w-[26%] xl:w-[24%] space-y-5">
      <div className="bg-[#14131D] border border-[#252233] rounded-2xl p-4 md:p-5 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white tracking-tight">
            Filters
          </h3>
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-[#9D99B0] hover:text-[#F97373] transition"
          >
            Clear
          </button>
        </div>

        {/* State */}
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-wide text-[#77708F] mb-1.5">
            State
          </p>
          <input
            value={stateFilter}
            onChange={(e) => onStateChange(e.target.value)}
            placeholder="e.g. Goa, Rajasthan"
            className="w-full bg-[#0E0D13] border border-[#2D2A37] rounded-xl px-3 py-2 text-sm text-[#E5E3F3] placeholder:text-[#6E6782] outline-none focus:border-[#8C5FF6] transition"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-wide text-[#77708F] mb-1.5">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {["all", "Villas", "Resort", "Rooms", "Hostels", "Apartment"].map(
              (c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onCategoryChange(c)}
                  className={`px-3 py-1.5 rounded-full text-[11px] border transition ${
                    category === c
                      ? "bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] text-white border-transparent shadow-[0_0_18px_rgba(140,95,246,0.5)]"
                      : "bg-[#0E0D13] border-[#2D2A37] text-[#C9C5D4] hover:border-[#8C5FF6]"
                  }`}
                >
                  {c === "all" ? "All" : c}
                </button>
              )
            )}
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[#77708F] mb-1.5">
            Price per night (₹)
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) =>
                onPriceChange(e.target.value, maxPrice ?? "")
              }
              placeholder="Min"
              className="w-1/2 bg-[#0E0D13] border border-[#2D2A37] rounded-xl px-3 py-2 text-sm text-[#E5E3F3] placeholder:text-[#6E6782] outline-none focus:border-[#8C5FF6] transition"
            />
            <span className="text-xs text-[#77708F]">—</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) =>
                onPriceChange(minPrice ?? "", e.target.value)
              }
              placeholder="Max"
              className="w-1/2 bg-[#0E0D13] border border-[#2D2A37] rounded-xl px-3 py-2 text-sm text-[#E5E3F3] placeholder:text-[#6E6782] outline-none focus:border-[#8C5FF6] transition"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

// ---------- Grid / Results ----------
function HomesGrid({ homes, loading, initialLoading, error, bottomRef, hasMore }) {
  if (initialLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-16 text-sm text-[#C9C5D4]">
        Loading stays…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 text-sm text-[#FCA5A5]">
        <p>Something went wrong while loading homes.</p>
        <p className="text-[11px] text-[#9D99B0] mt-1">{error}</p>
      </div>
    );
  }

  if (!loading && homes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 text-sm text-[#C9C5D4]">
        <p>No homes match your filters yet.</p>
        <p className="text-[11px] text-[#77708F] mt-1">
          Try changing the search, filters or price range.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {homes.map((home) => (
          <HomeCard key={home._id} home={home} />
        ))}
      </div>

      {/* Loader & sentinel */}
      <div ref={bottomRef} className="w-full h-10 mt-8 flex items-center justify-center">
        {loading && (
          <span className="text-xs text-[#9D99B0]">
            Loading more stays…
          </span>
        )}
        {!hasMore && !loading && homes.length > 0 && (
          <span className="text-[11px] text-[#77708F]">
            You’ve reached the end of results.
          </span>
        )}
      </div>
    </div>
  );
}

// ---------- Main Page ----------
export default function HomeList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- Controlled states from URL ---
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "recent");
  const [stateFilter, setStateFilter] = useState(
    searchParams.get("state") || ""
  );
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const debouncedSearch = useDebouncedValue(searchInput, 500);

  const [homes, setHomes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  const bottomRef = useRef(null);

  // --- Sync state -> URL ---
  const syncUrl = useCallback(() => {
    const params = {};

    if (debouncedSearch) params.search = debouncedSearch;
    if (sort && sort !== "recent") params.sort = sort;
    if (stateFilter) params.state = stateFilter;
    if (category && category !== "all") params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    setSearchParams(params, { replace: true });
  }, [debouncedSearch, sort, stateFilter, category, minPrice, maxPrice, setSearchParams]);

  // Whenever debounced search/filters change → reset list & page
  useEffect(() => {
    setHomes([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedSearch, sort, stateFilter, category, minPrice, maxPrice]);

  // Sync URL when filters/search change
  useEffect(() => {
    syncUrl();
  }, [syncUrl]);

  // --- Fetch data ---
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchListedHomes({
          page,
          limit: 9,
          search: debouncedSearch,
          sort,
          state: stateFilter,
          category,
          minPrice,
          maxPrice,
        });

        if (cancelled) return;

        if (page === 1) {
          setHomes(data.homes || []);
        } else {
          setHomes((prev) => [...prev, ...(data.homes || [])]);
        }

        setHasMore(Boolean(data.hasMore));
        setError(null);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError(err.message || "Failed to load homes");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setInitialLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [
    page,
    debouncedSearch,
    sort,
    stateFilter,
    category,
    minPrice,
    maxPrice,
  ]);

  // --- Infinite scroll observer ---
  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading]);

  // --- Handlers for filters/sort/search ---
  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setSort("recent");
    setStateFilter("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="bg-[#0E0D13] min-h-screen text-[#E5E3F3]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        {/* Header line */}
        <section className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Explore all stays
          </h1>
          <p className="text-xs sm:text-sm text-[#9D99B0] mt-1">
            Use filters, sort and search to find the perfect LivinGo home.
          </p>
        </section>

        {/* Search + Sort */}
        <section className="mb-6">
          <SearchAndSortBar
            searchInput={searchInput}
            onSearchChange={setSearchInput}
            sort={sort}
            onSortChange={setSort}
          />
        </section>

        {/* Layout: filters + results */}
        <section className="flex flex-col md:flex-row gap-6 mt-4">
          <FiltersSidebar
            stateFilter={stateFilter}
            onStateChange={setStateFilter}
            category={category}
            onCategoryChange={setCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
            onReset={handleResetFilters}
          />

          <HomesGrid
            homes={homes}
            loading={loading}
            initialLoading={initialLoading}
            error={error}
            bottomRef={bottomRef}
            hasMore={hasMore}
          />
        </section>
      </main>
    </div>
  );
}
