export function timeSince(time) {
  const date = new Date(time);
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return `${Math.floor(secondsPast)} seconds ago`;
  }
  if (secondsPast < 3600) {
    // less than an hour
    return `${Math.floor(secondsPast / 60)} minutes ago`;
  }
  if (secondsPast < 86400) {
    // less than a day
    return `${Math.floor(secondsPast / 3600)} hours ago`;
  }
  if (secondsPast >= 86400) {
    // more than one day
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear() === now.getFullYear() ? "" : ` ${date.getFullYear()}`;
    return `${day} ${month}${year}`;
  }
}
