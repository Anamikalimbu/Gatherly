import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import EventCard from "../components/EventCard.jsx";
import SkeletonGrid from "../components/SkeletonGrid.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import useEvents from "../hooks/useEvents.js";
import usePageTitle from "../hooks/usePageTitle.js";

const sorters = {
  date: (a, b) => a.date.localeCompare(b.date),
  "price-low": (a, b) => a.price - b.price,
  "price-high": (a, b) => b.price - a.price,
};

function Events() {
  usePageTitle("Events");
  const [searchParams, setSearchParams] = useSearchParams();
  const [freeOnly, setFreeOnly] = useState(false);
  const [sort, setSort] = useState("date");
  const { events, loading, error, retry } = useEvents();

  // search text and category live in the URL so filtered lists can be shared
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== "All") next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
    setFreeOnly(false);
    setSort("date");
  };

  // build the category list from the data instead of hard-coding it
  const categories = ["All", ...new Set(events.map((e) => e.category))];
  const term = query.trim().toLowerCase();

  const filtered = events
    .filter((event) => {
      if (category !== "All" && event.category !== category) return false;
      if (freeOnly && event.price !== 0) return false;
      if (!term) return true;
      return [event.title, event.city, event.venue, event.category]
        .join(" ")
        .toLowerCase()
        .includes(term);
    })
    .sort(sorters[sort]);

  const filtersActive = term || category !== "All" || freeOnly || sort !== "date";

  return (
    <>
      <PageHeader
        title="All events"
        intro="Search the full programme and filter by category or price."
      />

      <div className="container page">
        <div className="toolbar">
          <input
            type="search"
            className="input"
            placeholder="Search by name, city or venue"
            value={query}
            onChange={(e) => setParam("q", e.target.value)}
            aria-label="Search events"
          />
          <select
            className="input select-small"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort events"
          >
            <option value="date">Soonest first</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(e) => setFreeOnly(e.target.checked)}
            />
            Free only
          </label>
        </div>

        <div className="chips chips-filter" role="group" aria-label="Filter by category">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              className={name === category ? "chip chip-button chip-active" : "chip chip-button"}
              aria-pressed={name === category}
              onClick={() => setParam("category", name)}
            >
              {name}
            </button>
          ))}
        </div>

        {loading && <SkeletonGrid count={9} />}
        {error && <ErrorMessage message={error} onRetry={retry} />}

        {!loading && !error && (
          <>
            <div className="result-bar">
              <p className="result-count">
                Showing {filtered.length} of {events.length} events
              </p>
              {filtersActive && (
                <button className="link-button" onClick={clearFilters}>
                  Clear filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="status">
                <p className="status-title">No events match your search</p>
                <p>Try a different keyword or clear the filters.</p>
              </div>
            ) : (
              <div className="grid">
                {filtered.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Events;
