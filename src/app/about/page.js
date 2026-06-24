import AboutClient from "./AboutClient";

export const metadata = {
  title: "About",
  description:
    "About Alexi Canamo: a 19-year-old founder and product engineer in Manila building tools for students, startups, and communities.",
  openGraph: {
    title: "About - Alexi Canamo",
    description:
      "A personal profile of Alexi Canamo, from early curiosity with code to building tools for students, startups, and communities.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
