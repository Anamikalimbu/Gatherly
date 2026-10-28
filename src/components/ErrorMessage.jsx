import PropTypes from "prop-types";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status status-error" role="alert">
      <p className="status-title">Something went wrong</p>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-outline" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
