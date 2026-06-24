import EditorialHeader from "@/components/EditorialHeader";

export default function SecurityPage() {
  return (
    <main
      aria-label="Security Research"
      className="min-h-screen pt-20 sm:pt-28"
    >
      <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <EditorialHeader
          body="Responsible disclosures and security notes will live here when there is something worth publishing."
          eyebrow="Security"
          title="Security research."
        />
      </div>
    </main>
  );
}
