import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { PageShell } from "@/components/PageShell";
import { getArtistProfile } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about the artist, process, and studio practice.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const artist = await getArtistProfile();

  return (
    <PageShell>
      <AboutSection artist={artist} />
    </PageShell>
  );
}
