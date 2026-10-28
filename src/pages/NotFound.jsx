import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle.js";

function NotFound() {
  usePageTitle("Page not found");

  return (
    <div className="container page page-narrow not-found">
      <p className="eyebrow">Error 404</p>
      <h1>We can't find that page</h1>
      <p>The link may be broken, or the page may have moved.</p>
      <Link to="/events" className="btn">
        Browse events
      </Link>
    </div>
  );
}

export default NotFound;
