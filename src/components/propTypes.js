import PropTypes from "prop-types";

export const eventShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  seatsLeft: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  organizer: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});
