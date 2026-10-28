import { API_URL } from "./config.js";

const REGISTER_URL = API_URL;

export async function registerForEvent({ eventId, name, email, tickets }) {
  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: eventId, name, email, tickets }),
  });

  if (!response.ok) {
    throw new Error("Registration failed. Please try again in a moment.");
  }
  return response.json();
}
