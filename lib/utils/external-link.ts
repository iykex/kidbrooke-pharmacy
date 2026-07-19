export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function externalLinkProps(href: string) {
  return isExternalHref(href)
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}

export function isUsableHref(href: string): boolean {
  const normalized = href.trim();
  return normalized.length > 0 && normalized !== "#";
}
