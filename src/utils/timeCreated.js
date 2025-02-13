export function timeCreated() {
  const timestamp = new Date();
  return {
    timeStamp: timestamp,
    date: timestamp.toLocaleDateString(),
    time: timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}
