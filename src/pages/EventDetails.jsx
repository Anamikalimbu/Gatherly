import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import SeatsMeter from "../components/SeatsMeter.jsx";
import EventCard from "../components/EventCard.jsx";
import useEvents from "../hooks/useEvents.js";
import usePageTitle from "../hooks/usePageTitle.js";
import { fetchEventById } from "../api/events.js";
import { downloadCalendarFile } from "../utils/calendar.js";
import { categoryColour } from "../utils/categories.js";
import { formatDate, formatTime, formatPrice } from "../utils/format.js";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const { events } = useEvents();

  usePageTitle(event ? event.title : "Event");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");
    setEvent(null);
    setCopied(false);

    fetchEventById(id)
      .then((data) => {
        if (!ignore) setEvent(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard can be blocked; nothing else to do
    }
  };

  // up to three other events, same category first
  const related = event
    ? events
        .filter((e) => e.id !== event.id)
        .sort((a, b) => Number(b.category === event.category) - Number(a.category === event.category))
        .slice(0, 3)
    : [];

  return (
    <div className="container page">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Events", to: "/events" },
          { label: event ? event.title : "Event" },
        ]}
      />

      {loading && <Loader text="Loading event..." />}
      {error && (
        <>
          <ErrorMessage message={error} />
          <p className="center">
            <Link to="/events" className="btn btn-outline">
              Back to all events
            </Link>
          </p>
        </>
      )}

      {event && (
        <>
          <div className="detail-layout">
            <article>
              <span className="detail-category" style={{ "--cat": categoryColour(event.category) }}>
                {event.category}
              </span>
              <h1 className="detail-title">{event.title}</h1>
              <p className="event-organizer">Organised by {event.organizer}</p>

              <dl className="facts">
                <div>
                  <dt>Date</dt>
                  <dd>{formatDate(event.date)}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{formatTime(event.time)}</dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>
                    {event.venue}, {event.city}
                  </dd>
                </div>
                <div>
                  <dt>Price</dt>
                  <dd>{formatPrice(event.price)}</dd>
                </div>
              </dl>

              <SeatsMeter seatsLeft={event.seatsLeft} capacity={event.capacity} />

              <div className="action-row">
                <button className="btn btn-outline btn-small" onClick={() => downloadCalendarFile(event)}>
                  Add to calendar
                </button>
                <button className="btn btn-outline btn-small" onClick={copyLink}>
                  {copied ? "Link copied" : "Copy link"}
                </button>
              </div>

              <h2>About this event</h2>
              {event.description.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>

            <aside className="register-box">
              <RegisterForm event={event} />
            </aside>
          </div>

          {related.length > 0 && (
            <section className="related">
              <h2>You might also like</h2>
              <div className="grid">
                {related.map((item) => (
                  <EventCard key={item.id} event={item} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default EventDetails;
