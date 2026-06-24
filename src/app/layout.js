import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import BackgroundEffects from "../components/BackgroundEffects";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://alexi.life"),
  title: {
    default: "Alexi Canamo",
    template: "%s | Alexi Canamo",
  },
  description:
    "Alexi Canamo is a 19-year-old CS student in Manila making student tools, small apps, and websites with friends.",
  keywords: [
    "Alexi Canamo",
    "software developer",
    "web developer",
    "Philippines",
    "Computer Science",
    "Ateneo",
    "ADMU",
    "portfolio",
    "student developer",
    "React",
    "Next.js",
    "JavaScript",
    "DOST Scholar",
    "MISA",
    "NextPay",
    "Enlistment Helper",
    "QPI Calculator",
    "One Big Match",
  ],
  authors: [{ name: "Alexi Canamo", url: "https://alexi.life" }],
  creator: "Alexi Canamo",
  publisher: "Alexi Canamo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexi.life",
    title: "Alexi Canamo",
    description:
      "Alexi Canamo is a 19-year-old CS student in Manila making student tools, small apps, and websites with friends.",
    siteName: "Alexi Canamo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alexi Canamo - Software Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexi Canamo",
    description:
      "19-year-old CS student in Manila making student tools, small apps, and websites with friends.",
    creator: "@alexicanamo",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/avatar.webp",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Structured Data - Person Schema */}
        <Script
          id="person-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from local metadata.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Alexi Canamo",
              alternateName: "Alexi Roth Luis Cañamo",
              url: "https://alexi.life",
              image: "https://alexi.life/og-image.png",
              jobTitle: "Software Developer",
              description:
                "19-year-old Computer Science student in Manila making student tools, small apps, and websites with friends.",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Ateneo de Manila University",
                sameAs: "https://www.ateneo.edu",
              },
              knowsAbout: [
                "Software Development",
                "Web Development",
                "React",
                "Next.js",
                "JavaScript",
                "TypeScript",
                "Node.js",
                "Python",
                "PostgreSQL",
                "MongoDB",
              ],
              sameAs: [
                "https://github.com/itsalexi",
                "https://linkedin.com/in/alexicanamo",
                "https://instagram.com/alexicanamo",
                "https://x.com/alexicanamo",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Manila",
                addressCountry: "PH",
              },
            }),
          }}
        />

        {/* Structured Data - Website Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from local metadata.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Alexi Canamo",
              url: "https://alexi.life",
              description:
                "Personal site of Alexi Canamo, a Computer Science student in Manila.",
              publisher: {
                "@type": "Person",
                name: "Alexi Canamo",
              },
              inLanguage: "en-US",
            }),
          }}
        />

        {/* Structured Data - Organization/Professional Service */}
        <Script
          id="professional-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from local metadata.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Alexi Canamo - Software Development",
              image: "https://alexi.life/og-image.png",
              description:
                "Student tools, small apps, and websites by Alexi Canamo.",
              url: "https://alexi.life",
              telephone: "",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Manila",
                addressCountry: "Philippines",
              },
              priceRange: "$$",
              openingHours: "Mo-Su",
            }),
          }}
        />

        {/* Cloudflare Analytics */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "86ec04c4f2cb40658a18c7523aa83bc2"}'
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--portfolio-bg)] font-sans antialiased`}
      >
        <BackgroundEffects />
        <div className="relative z-10">
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
