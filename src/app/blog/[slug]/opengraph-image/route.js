import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { seoDescription, siteConfig } from "@/lib/seo";

export const runtime = "nodejs";

const size = {
  width: 1200,
  height: 630,
};

const fontPath = path.join(
  process.cwd(),
  "node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf",
);

function safeSlug(slug = "") {
  return /^[a-z0-9-]+$/.test(slug) ? slug : "";
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

  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;
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

function readBlog(slug) {
  const normalizedSlug = safeSlug(slug);
  if (!normalizedSlug) return null;

  const filePath = path.join(
    process.cwd(),
    "src/content/blogs",
    `${normalizedSlug}.md`,
  );

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter } = matter(fileContents);

  return frontmatter;
}

function readFontArrayBuffer(filePath) {
  if (!fs.existsSync(filePath)) return null;

  const fontBuffer = fs.readFileSync(filePath);
  return fontBuffer.buffer.slice(
    fontBuffer.byteOffset,
    fontBuffer.byteOffset + fontBuffer.byteLength,
  );
}

export async function GET(_request, { params }) {
  const { slug } = await params;
  const blog = readBlog(slug);

  if (!blog) {
    return new Response("Blog not found", { status: 404 });
  }

  const heroImage =
    (await publicImageToDataUrl(blog.image)) ||
    (await publicImageToDataUrl(siteConfig.ogImage));
  const subtitle = blog.subtitle || seoDescription(blog.excerpt);
  const fontData = readFontArrayBuffer(fontPath);

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
      {heroImage
        ? <img
            alt=""
            src={heroImage}
            style={{
              height: "100%",
              objectFit: "cover",
              objectPosition: getImagePosition(blog.imagePosition),
              width: "100%",
            }}
          />
        : null}

      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(17,17,15,0.9) 0%, rgba(17,17,15,0.62) 34%, rgba(17,17,15,0.12) 68%, rgba(17,17,15,0) 100%)",
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
          width: 610,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 5.2,
            opacity: 0.72,
            textTransform: "uppercase",
          }}
        >
          alexi.life
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
              fontSize: 70,
              letterSpacing: -2.6,
              lineHeight: 0.92,
            }}
          >
            {blog.title}
          </div>
          {subtitle
            ? <div
                style={{
                  color: "rgba(244,241,234,0.76)",
                  display: "flex",
                  fontSize: 29,
                  lineHeight: 1.25,
                  maxWidth: 500,
                }}
              >
                {subtitle}
              </div>
            : null}
        </div>
      </div>
    </div>,
    {
      ...size,
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
