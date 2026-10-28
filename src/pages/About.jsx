import PageHeader from "../components/PageHeader.jsx";
import usePageTitle from "../hooks/usePageTitle.js";

const features = [
  { title: "Browse", text: "See the upcoming programme, sorted by date, with price and seat availability on every card." },
  { title: "Search and filter", text: "Narrow the list by keyword, category or free entry. Filters live in the URL, so a filtered list can be shared." },
  { title: "Register", text: "Reserve up to five tickets per booking and receive a booking reference immediately." },
  { title: "Plan", text: "Add an event to your calendar or copy its link to send to a friend." },
];

const stack = [
  ["React 18", "Function components, props and hooks"],
  ["React Router 6", "Page routing and URL search parameters"],
  ["Vite", "Development server and production build"],
  ["Fetch API", "Loading data and posting forms"],
  ["Plain CSS", "Custom properties, grid and flexbox"],
];

function About() {
  usePageTitle("About");

  return (
    <>
      <PageHeader
        title="About Gatherly"
        intro="A small event management site built to show how a React multi-page app fits together."
      />

      <div className="container page page-narrow">
        <h2 className="first-heading">Why it exists</h2>
        <p>
          Many local organisers share their events through social media posts
          that are hard to search and easy to miss. Gatherly is a proof of
          concept for a simple alternative: one page that shows what is on,
          where, for how much, and lets people reserve a seat.
        </p>

        <h2>What you can do</h2>
        <div className="feature-grid">
          {features.map((item) => (
            <div key={item.title} className="feature">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <h2>How it's built</h2>
        <table className="stack-table">
          <tbody>
            {stack.map(([name, use]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>About the data</h2>
        <p>
          The events and organisers are made-up examples, stored in a JSON file
          that the app loads with <code>fetch</code>. It stands in for a real
          backend. Registrations and contact messages are sent to
          JSONPlaceholder, a dummy API, so nothing is actually saved.
        </p>
      </div>
    </>
  );
}

export default About;
