import PageHeader from "../components/PageHeader.jsx";
import ContactForm from "../components/ContactForm.jsx";
import usePageTitle from "../hooks/usePageTitle.js";

const faqs = [
  {
    q: "How do I get my booking reference?",
    a: "It appears on screen as soon as you register for an event. Take a screenshot or note it down.",
  },
  {
    q: "Can I register for more than one ticket?",
    a: "Yes, up to five tickets per booking, as long as that many seats are left.",
  },
  {
    q: "Do I pay online?",
    a: "No. This demo only reserves seats. Payment is not part of the project.",
  },
  {
    q: "How can I list my own event?",
    a: "Send us a message with the date, venue and a short description and we will get back to you.",
  },
];

function Contact() {
  usePageTitle("Contact");

  return (
    <>
      <PageHeader
        title="Contact us"
        intro="Questions about a booking, or want to list your event? Send us a message."
      />

      <div className="container page">
        <div className="contact-layout">
          <ContactForm />

          <aside className="contact-info">
            <h2>Contact details</h2>
            <p>
              <strong>Email</strong>
              <br />
              hello@gatherly.example
            </p>
            <p>
              <strong>Office hours</strong>
              <br />
              Sunday to Friday, 10:00 to 17:00
            </p>
            <p>
              <strong>Address</strong>
              <br />
              Main Road, Biratnagar, Koshi Province
            </p>
          </aside>
        </div>

        <section className="faq">
          <h2>Frequently asked questions</h2>
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>
      </div>
    </>
  );
}

export default Contact;
