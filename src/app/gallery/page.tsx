import type { Metadata } from "next";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import { getAllArtwork } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse selected artwork, paintings, studies, and recent pieces.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const artwork = await getAllArtwork();

  return (
    <PageShell>
      <PageIntro
        kicker="Selected Work"
        heading="Gallery"
        intro="A quiet index of selected pieces, studies, and available work."
      />
      <ArtworkGrid artwork={artwork} />
    </PageShell>
  );
}
