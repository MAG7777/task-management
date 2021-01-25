export function formatDate(dateStr = "") {
  return dateStr.slice(0, 10);
}

export function cutString(str = "", length = 0) {
  return !length || length >= str.length ? str : str.slice(0, length) + "...";
}
