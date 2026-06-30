export const siteConfig = {
  name: "Alexi Canamo",
  title: "Alexi Canamo - Founder & Product Engineer",
  url: "https://alexi.life",
  description:
    "Alexi Canamo is a 19-year-old founder and product engineer in Manila building student tools, startup software, and community products people use.",
  ogImage: "/og-image.png",
  twitterHandle: "@alexicanamo",
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function stripMarkdown(input = "") {
  return String(input)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/(^|\s)-(?=\s)/g, " ")
    .replace(/[#*_~>|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function seoDescription(input, fallback = siteConfig.description) {
  const clean = stripMarkdown(input || fallback);
  if (clean.length <= 160) return clean;

  const truncated = clean.slice(0, 157);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 90 ? lastSpace : 157).trim()}.`;
}

export function dateToIso(value) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  ).toISOString();
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
  absoluteTitle = false,
}) {
  const cleanDescription = seoDescription(description);
  const fullTitle =
    absoluteTitle || title === siteConfig.name
      ? title
      : `${title} | ${siteConfig.name}`;
  const imageUrl = absoluteUrl(image || siteConfig.ogImage);
  const defaultImage = image === siteConfig.ogImage || !image;
  const generatedImage =
    /(^\/og\?)|(^\/.*\/opengraph-image$)|(^\/opengraph-image$)/.test(
      image || "",
    );

  const metadata = {
    title: absoluteTitle ? { absolute: title } : title,
    description: cleanDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description: cleanDescription,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          alt: `${title} preview`,
          ...(defaultImage || generatedImage
            ? { width: 1200, height: 630, type: "image/png" }
            : {}),
        },
      ],
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: cleanDescription,
      creator: siteConfig.twitterHandle,
      images: [imageUrl],
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
