const EVENTS_URL = "/events.json";

let cachedEvents = null;

export async function fetchEvents() {
  if (cachedEvents) return cachedEvents;

  const response = await fetch(EVENTS_URL);
  if (!response.ok) {
    throw new Error(`Could not load events (status ${response.status}).`);
  }

  const events = await response.json();
  cachedEvents = events.sort((a, b) => a.date.localeCompare(b.date));
  return cachedEvents;
}

export async function fetchEventById(id) {
  const events = await fetchEvents();
  const event = events.find((item) => item.id === id);

  if (!event) {
    throw new Error("We couldn't find that event. It may have been removed.");
  }
  return event;
}
