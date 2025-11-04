/**
 * Calculate estimated reading time based on word count
 * @param {string} text - The text content to analyze
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {string} Formatted reading time (e.g., "5 min read")
 */
export function calculateReadingTime(text, wordsPerMinute = 200) {
  if (!text || typeof text !== "string") {
    return "1 min read";
  }

  // Remove markdown syntax, code blocks, and extra whitespace
  const cleanText = text
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`[^`]*`/g, "") // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // Remove links
    .replace(/[#*_~`]/g, "") // Remove markdown symbols
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  // Count words (split by whitespace and filter empty strings)
  const wordCount = cleanText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Calculate minutes (round up to nearest minute)
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Return formatted string
  return minutes === 1 ? "1 min read" : `${minutes} min read`;
}
