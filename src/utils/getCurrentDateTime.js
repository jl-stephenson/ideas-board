export function getCurrentDateTime() {
  const date = new Date();
  const timestamp = date.getTime();

  return {
    timestamp: timestamp,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}
