import { useState, useEffect } from "react";
import { fetchEvents } from "../api/events.js";

function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");

    fetchEvents()
      .then((data) => {
        if (!ignore) setEvents(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  const retry = () => setAttempt((n) => n + 1);

  return { events, loading, error, retry };
}

export default useEvents;
