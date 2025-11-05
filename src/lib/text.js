export function normalizeEllipsis(input) {
  if (typeof input !== "string") return input;
  // Replace three or more consecutive dots with a single ellipsis character
  const replaced = input.replace(/\.\.\.+/g, "…");
  // Collapse any spaces before the ellipsis
  return replaced.replace(/\s+…/g, " …");
}




