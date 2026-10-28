import PropTypes from "prop-types";

function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid" role="status" aria-label="Loading events">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="card skeleton-card" aria-hidden="true">
          <div className="skeleton skeleton-badge"></div>
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-line short"></div>
          <div className="skeleton skeleton-line shorter"></div>
        </div>
      ))}
    </div>
  );
}

SkeletonGrid.propTypes = { count: PropTypes.number };

export default SkeletonGrid;
