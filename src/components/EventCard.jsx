import { Link } from "react-router-dom";
import { getDay, getMonth, formatTime, formatPrice, seatStatus } from "../utils/format.js";
import { categoryColour } from "../utils/categories.js";
import { eventShape } from "./propTypes.js";

function EventCard({ event }) {
  const { id, title, category, date, time, venue, city, price, seatsLeft } = event;
  const status = seatStatus(seatsLeft);

  return (
    <article className="card event-card" style={{ "--cat": categoryColour(category) }}>
      <div className="event-card-body">
        <div className="event-card-head">
          <div className="date-badge" aria-hidden="true">
            <span className="date-day">{getDay(date)}</span>
            <span className="date-month">{getMonth(date)}</span>
          </div>
          <p className="event-category">{category}</p>
        </div>

        <h3 className="event-title">
          <Link to={`/events/${id}`}>{title}</Link>
        </h3>

        <p className="event-line">
          {formatTime(time)} &middot; {city}
        </p>
        <p className="event-line event-venue">{venue}</p>
      </div>

      <div className="event-card-foot">
        <span className={price === 0 ? "price price-free" : "price"}>
          {formatPrice(price)}
        </span>
        <span className={`seats seats-${status.tone}`}>{status.label}</span>
      </div>
    </article>
  );
}

EventCard.propTypes = { event: eventShape.isRequired };

export default EventCard;
