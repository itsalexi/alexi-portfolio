import AboutClient from "./AboutClient";

export const metadata = {
  title: "About",
  description:
    "Learn about Alexi Canamo's journey from a 7-year-old curious about code to building tools used by thousands. CS student at Ateneo, DOST Scholar, AVP at MISA, and intern at NextPay.",
  openGraph: {
    title: "About - Alexi Canamo",
    description:
      "My journey from childhood curiosity to building impactful software. Student, developer, and advocate for using code to help others.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
