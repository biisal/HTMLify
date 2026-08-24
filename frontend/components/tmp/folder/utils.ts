export function formatExpiry(expiry: string) {
  return new Date(expiry).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatExpiryDelta(expiry: string) {
  const diff = new Date(expiry).getTime() - Date.now();
  if (diff <= 0) return "expired";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}

export function isExpired(expiry: string) {
  return new Date(expiry).getTime() <= Date.now();
}
