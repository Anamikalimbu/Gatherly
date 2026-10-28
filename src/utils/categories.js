const colours = {
  Tech: "#1d4e89",
  Music: "#6d3fa0",
  Food: "#b45309",
  Workshop: "#0f766e",
  Sports: "#2f7d32",
  Business: "#475569",
  Art: "#b83a5e",
};

export function categoryColour(category) {
  return colours[category] || "#475569";
}
