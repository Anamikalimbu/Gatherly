function escapeText(text) {
  return text.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function downloadCalendarFile(event) {
  const [year, month, day] = event.date.split("-");
  const [hours, minutes] = event.time.split(":");
  const endHours = String((Number(hours) + 2) % 24).padStart(2, "0");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gatherly//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}@gatherly`,
    `DTSTART:${year}${month}${day}T${hours}${minutes}00`,
    `DTEND:${year}${month}${day}T${endHours}${minutes}00`,
    `SUMMARY:${escapeText(event.title)}`,
    `LOCATION:${escapeText(`${event.venue}, ${event.city}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.id}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}
