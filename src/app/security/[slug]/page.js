import EditorialHeader from "@/components/EditorialHeader";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Security Note",
  description: "This security note is not published yet.",
  path: "/security",
  noIndex: true,
});

export default function SecurityDetailPage() {
  return (
    <main
      aria-label="Security Research Detail"
      className="min-h-screen pt-20 sm:pt-28"
    >
      <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <EditorialHeader
          body="This note is not published yet."
          eyebrow="Security"
          title="Security note."
        />
      </div>
    </main>
  );
}
