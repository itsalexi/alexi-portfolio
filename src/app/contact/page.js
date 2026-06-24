import ContactCanvas from "@/components/ContactCanvas";
import EditorialHeader from "@/components/EditorialHeader";

export const metadata = {
  title: "Contact",
  description:
    "Email Alexi Canamo about projects, talks, student tools, events, or a quick hello.",
  openGraph: {
    title: "Contact - Alexi Canamo",
    description:
      "Email Alexi Canamo about projects, talks, student tools, events, or a quick hello.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[980px] px-5 pt-20 sm:px-8 sm:pt-28 lg:px-10">
      <EditorialHeader
        body="Projects, talks, student tools, event ideas, or a quick hello. Email is best."
        eyebrow="Contact"
        title="Say hi."
      />
      <ContactCanvas compact showHeader={false} />
    </main>
  );
}
