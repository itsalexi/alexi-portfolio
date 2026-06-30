import assert from "node:assert/strict";
import test from "node:test";
import {
  extractMarkdownHeadings,
  hasArticleSections,
  slugifyHeading,
} from "./table-of-contents.mjs";

test("extracts h2 and h3 headings with stable unique ids", () => {
  const markdown = `# Page title

Intro paragraph.

## Why this matters

### First pass

## Why this matters

#### Too deep

\`\`\`
## Not a section
\`\`\`

## [Launch notes](https://example.com) \`v1\`
`;

  assert.deepEqual(extractMarkdownHeadings(markdown), [
    { id: "why-this-matters", level: 2, text: "Why this matters" },
    { id: "first-pass", level: 3, text: "First pass" },
    { id: "why-this-matters-2", level: 2, text: "Why this matters" },
    { id: "launch-notes-v1", level: 2, text: "Launch notes v1" },
  ]);
});

test("slugifies heading text into readable anchor ids", () => {
  assert.equal(
    slugifyHeading("C++ & security: what's next?"),
    "c-security-whats-next",
  );
});

test("only shows article navigation when there are multiple valid sections", () => {
  assert.equal(hasArticleSections([]), false);
  assert.equal(hasArticleSections([{ id: "intro", text: "Intro" }]), false);
  assert.equal(
    hasArticleSections([
      { id: "intro", text: "Intro" },
      { id: "", text: "Missing id" },
      { id: "next", text: "Next" },
    ]),
    true,
  );
});
