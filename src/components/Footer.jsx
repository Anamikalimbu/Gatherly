import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">Gatherly</p>
          <p className="footer-text">
            Meetups, workshops, concerts and festivals across Nepal, with online
            registration.
          </p>
        </div>
        <div>
          <p className="footer-heading">Explore</p>
          <ul className="footer-links">
            <li><Link to="/events">All events</Link></li>
            <li><Link to="/events?category=Tech">Tech events</Link></li>
            <li><Link to="/events?category=Workshop">Workshops</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-heading">Company</p>
          <ul className="footer-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {year} Gatherly</span>
        <span>Student project. All events are made-up examples.</span>
      </div>
    </footer>
  );
}

export default Footer;
