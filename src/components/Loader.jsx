import PropTypes from "prop-types";

function Loader({ text = "Loading..." }) {
  return (
    <div className="status" role="status">
      <span className="spinner" aria-hidden="true"></span>
      <p>{text}</p>
    </div>
  );
}

Loader.propTypes = { text: PropTypes.string };

export default Loader;
