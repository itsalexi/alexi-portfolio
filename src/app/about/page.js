import { createMetadata } from "@/lib/seo";
import AboutClient from "./AboutClient";

export const metadata = createMetadata({
  title: "About",
  description:
    "About Alexi Canamo, a 19-year-old founder and product engineer in Manila building tools for students, startups, and communities.",
  path: "/about",
  image: "/og?page=about",
});

export default function AboutPage() {
  return <AboutClient />;
}
