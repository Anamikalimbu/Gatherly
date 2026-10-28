import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import SkeletonGrid from "../components/SkeletonGrid.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import useEvents from "../hooks/useEvents.js";
import usePageTitle from "../hooks/usePageTitle.js";
import { categoryColour } from "../utils/categories.js";

function Home() {
  usePageTitle("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { events, loading, error, retry } = useEvents();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/events?q=${encodeURIComponent(q)}` : "/events");
  };

  const upcoming = events.slice(0, 6);
  const categories = [...new Set(events.map((e) => e.category))];
  const cityCount = new Set(events.map((e) => e.city)).size;
  const freeCount = events.filter((e) => e.price === 0).length;

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Events across Nepal</p>
            <h1>Find an event you'll want to be at, and reserve your seat.</h1>
            <p className="hero-text">
              Meetups, workshops, concerts and festivals in one place. Pick an
              event, register in under a minute and get a booking reference.
            </p>

            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                className="input"
                placeholder="Search by event, city or venue"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search events"
              />
              <button className="btn" type="submit">
                Find events
              </button>
            </form>
          </div>

          {!loading && !error && (
            <dl className="hero-stats">
              <div>
                <dt>Upcoming events</dt>
                <dd>{events.length}</dd>
              </div>
              <div>
                <dt>Cities</dt>
                <dd>{cityCount}</dd>
              </div>
              <div>
                <dt>Free to attend</dt>
                <dd>{freeCount}</dd>
              </div>
            </dl>
          )}
        </div>
      </section>

      {categories.length > 0 && (
        <section className="category-strip">
          <div className="container chips">
            <span className="chips-label">Browse by category</span>
            {categories.map((name) => (
              <Link
                key={name}
                to={`/events?category=${encodeURIComponent(name)}`}
                className="chip"
                style={{ "--cat": categoryColour(name) }}
              >
                {name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Coming up soon</h2>
            <Link to="/events" className="text-link">
              View all events
            </Link>
          </div>

          {loading && <SkeletonGrid count={6} />}
          {error && <ErrorMessage message={error} onRetry={retry} />}

          {!loading && !error && (
            <div className="grid">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>How booking works</h2>
          <ol className="steps">
            <li>
              <h3>Choose an event</h3>
              <p>Filter by category, city or price to narrow down the list.</p>
            </li>
            <li>
              <h3>Check the details</h3>
              <p>Each event page shows the date, venue, price and how many seats are left.</p>
            </li>
            <li>
              <h3>Register</h3>
              <p>Enter your name and email, pick the number of tickets and get your booking reference straight away.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <div>
            <h2>Organising an event?</h2>
            <p>Tell us what you're planning and we'll help you get it listed.</p>
          </div>
          <Link to="/contact" className="btn btn-light">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
