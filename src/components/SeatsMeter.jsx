import PropTypes from "prop-types";
import { seatStatus } from "../utils/format.js";

function SeatsMeter({ seatsLeft, capacity }) {
  const booked = capacity - seatsLeft;
  const percent = Math.round((booked / capacity) * 100);
  const status = seatStatus(seatsLeft);

  return (
    <div className="meter">
      <div className="meter-labels">
        <span>{percent}% booked</span>
        <span className={`seats seats-${status.tone}`}>{status.label}</span>
      </div>
      <div
        className="meter-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Seats booked"
      >
        <div className={`meter-fill meter-${status.tone}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

SeatsMeter.propTypes = {
  seatsLeft: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
};

export default SeatsMeter;
