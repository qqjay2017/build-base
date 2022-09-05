export function isEmpty(value: unknown) {
  return !value || value === 0 || value === "0";
}

export function isNotEmpty(value: unknown) {
  return !isEmpty(value);
}
