function toDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`);
}

export function formatDate(isoDate) {
  return toDate(isoDate).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getDay(isoDate) {
  return toDate(isoDate).getDate();
}

export function getMonth(isoDate) {
  return toDate(isoDate).toLocaleDateString("en-GB", { month: "short" });
}

// "15:00" -> "3:00 PM"
export function formatTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function formatPrice(price) {
  return price === 0 ? "Free" : `Rs. ${price.toLocaleString("en-IN")}`;
}

// Short text and colour hint for how full an event is.
export function seatStatus(seatsLeft) {
  if (seatsLeft === 0) return { label: "Sold out", tone: "full" };
  if (seatsLeft <= 10) return { label: `Only ${seatsLeft} left`, tone: "low" };
  return { label: `${seatsLeft} seats left`, tone: "ok" };
}
