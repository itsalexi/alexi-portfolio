import EditorialHeader from "@/components/EditorialHeader";

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
