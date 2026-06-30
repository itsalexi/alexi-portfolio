function stripInlineMarkdown(text = "") {
  return String(text)
    .replace(/!\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_~]/g, "")
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueId(baseId, seenIds) {
  const count = seenIds.get(baseId) || 0;
  seenIds.set(baseId, count + 1);
  return count === 0 ? baseId : `${baseId}-${count + 1}`;
}

export function slugifyHeading(text = "") {
  const slug = stripInlineMarkdown(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "section";
}

export function extractMarkdownHeadings(markdown = "") {
  const headings = [];
  const seenIds = new Map();
  let inCodeFence = false;
  let fenceMarker = "";

  for (const line of String(markdown).split(/\r?\n/)) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);

    if (fenceMatch) {
      const marker = fenceMatch[1][0];

      if (!inCodeFence) {
        inCodeFence = true;
        fenceMarker = marker;
      } else if (marker === fenceMarker) {
        inCodeFence = false;
        fenceMarker = "";
      }

      continue;
    }

    if (inCodeFence) continue;

    const headingMatch = line.match(/^ {0,3}(#{2,3})[ \t]+(.+?)\s*#*\s*$/);
    if (!headingMatch) continue;

    const text = stripInlineMarkdown(headingMatch[2]);
    if (!text) continue;

    const level = headingMatch[1].length;
    const id = uniqueId(slugifyHeading(text), seenIds);

    headings.push({ id, level, text });
  }

  return headings;
}

export function hasArticleSections(headings = []) {
  return headings.filter((heading) => heading.id && heading.text).length >= 2;
}

export function createHeadingIdResolver(headings = []) {
  const seenHeadings = new Map();

  return (level, text) => {
    const cleanText = stripInlineMarkdown(text);
    const key = `${level}:${cleanText}`;
    const usedCount = seenHeadings.get(key) || 0;
    seenHeadings.set(key, usedCount + 1);

    return (
      headings.filter(
        (heading) => heading.level === level && heading.text === cleanText,
      )[usedCount]?.id || slugifyHeading(cleanText)
    );
  };
}
