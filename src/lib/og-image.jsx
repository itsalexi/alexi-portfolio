import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { seoDescription } from "@/lib/seo";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

const fontPath = path.join(
  process.cwd(),
  "node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf",
);

export function safeSlug(slug = "") {
  return /^[a-z0-9-]+$/.test(slug) ? slug : "";
}

export function readMarkdownFrontmatter(directory, slug) {
  const normalizedSlug = safeSlug(slug);
  if (!normalizedSlug) return null;

  const filePath = path.join(process.cwd(), directory, `${normalizedSlug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter } = matter(fileContents);

  return frontmatter;
}

function getMimeType(filePath = "") {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".png") return "image/png";
  if (extension === ".webp") return "image/webp";
  if (extension === ".gif") return "image/gif";

  return "application/octet-stream";
}

async function publicImageToDataUrl(src = "") {
  if (!src || /^https?:\/\//.test(src)) return src;

  const normalizedSrc = src.split("?")[0].replace(/^\//, "");
  const filePath = path.join(process.cwd(), "public", normalizedSrc);

  if (!fs.existsSync(filePath)) return "";

  const mimeType = getMimeType(filePath);
  const imageBuffer =
    mimeType === "image/jpeg" || mimeType === "image/png"
      ? fs.readFileSync(filePath)
      : await sharp(filePath).jpeg({ quality: 90 }).toBuffer();
  const dataMimeType =
    mimeType === "image/jpeg" || mimeType === "image/png"
      ? mimeType
      : "image/jpeg";

  return `data:${dataMimeType};base64,${imageBuffer.toString("base64")}`;
}

function getImagePosition(position = "") {
  const positions = {
    top: "center top",
    center: "center center",
    bottom: "center bottom",
    left: "left center",
    right: "right center",
  };

  return positions[position] || positions.center;
}

function readFontArrayBuffer(filePath) {
  if (!fs.existsSync(filePath)) return null;

  const fontBuffer = fs.readFileSync(filePath);
  return fontBuffer.buffer.slice(
    fontBuffer.byteOffset,
    fontBuffer.byteOffset + fontBuffer.byteLength,
  );
}

function getTitleSize(title = "") {
  const length = String(title).length;

  if (length > 68) return 46;
  if (length > 52) return 52;
  if (length > 38) return 60;

  return 70;
}

export async function createOgImageResponse({
  title,
  description,
  eyebrow,
  image,
  imagePosition = "center",
}) {
  const heroImage = await publicImageToDataUrl(image);
  const subtitle = seoDescription(description, "");
  const fontData = readFontArrayBuffer(fontPath);
  const titleSize = getTitleSize(title);
  const label = eyebrow ? `alexi.life / ${eyebrow}` : "alexi.life";

  return new ImageResponse(
    <div
      style={{
        background: "#11110f",
        color: "#f4f1ea",
        display: "flex",
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      {heroImage ? (
        <img
          alt=""
          src={heroImage}
          style={{
            height: "100%",
            objectFit: "cover",
            objectPosition: getImagePosition(imagePosition),
            width: "100%",
          }}
        />
      ) : null}

      <div
        style={{
          background: heroImage
            ? "linear-gradient(90deg, rgba(17,17,15,0.9) 0%, rgba(17,17,15,0.64) 36%, rgba(17,17,15,0.16) 70%, rgba(17,17,15,0) 100%)"
            : "linear-gradient(120deg, #11110f 0%, #1a1917 64%, #252019 100%)",
          display: "flex",
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      />

      <div
        style={{
          background:
            "linear-gradient(0deg, rgba(17,17,15,0.58) 0%, rgba(17,17,15,0) 48%)",
          display: "flex",
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          left: 0,
          padding: "54px 64px",
          position: "absolute",
          top: 0,
          width: 650,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 0,
            opacity: 0.72,
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              letterSpacing: 0,
              lineHeight: 0.92,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                color: "rgba(244,241,234,0.76)",
                display: "flex",
                fontSize: 29,
                lineHeight: 1.25,
                maxWidth: 520,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    {
      ...ogImageSize,
      ...(fontData
        ? {
            fonts: [
              {
                data: fontData,
                name: "Noto Sans",
                style: "normal",
                weight: 400,
              },
            ],
          }
        : {}),
    },
  );
}

export const generatedOgImageSize = {
  width: ogImageSize.width,
  height: ogImageSize.height,
  type: "image/png",
};
