import PropTypes from "prop-types";

function PageHeader({ title, intro }) {
  return (
    <section className="page-header">
      <div className="container">
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.string,
};

export default PageHeader;
