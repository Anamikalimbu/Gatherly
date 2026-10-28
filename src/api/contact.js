import { API_URL } from "./config.js";

const CONTACT_URL = API_URL;

export async function sendContactMessage({ name, email, subject, message }) {
  const response = await fetch(CONTACT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: subject, body: message, name, email }),
  });

  if (!response.ok) {
    throw new Error("The message could not be sent. Please try again.");
  }
  return response.json();
}
