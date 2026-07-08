import type { Metadata } from "next";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import { getAllArtwork, getGalleryPageSettings } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGalleryPageSettings();

  return {
    title: settings.seoTitle || settings.heading || "Gallery",
    description: settings.seoDescription || settings.intro || "Browse selected artwork, paintings, studies, and recent pieces.",
  };
}

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const [artwork, settings] = await Promise.all([getAllArtwork(), getGalleryPageSettings()]);

  return (
    <PageShell>
      <PageIntro
        kicker={settings.kicker || "Selected Work"}
        heading={settings.heading || "Gallery"}
        intro={settings.intro}
      />
      <ArtworkGrid artwork={artwork} />
    </PageShell>
  );
}
