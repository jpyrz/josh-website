import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkDetail } from "@/components/ArtworkDetail";
import { PageShell } from "@/components/PageShell";
import { getArtworkBySlug } from "@/lib/sanity/queries";

type ArtworkPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    return {
      title: "Artwork Not Found",
    };
  }

  return {
    title: artwork.title,
    description: artwork.description || [artwork.medium, artwork.year].filter(Boolean).join(", "),
    openGraph: {
      title: artwork.title,
      description: artwork.description || artwork.medium,
      images: artwork.image?.src ? [{ url: artwork.image.src }] : undefined,
    },
  };
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  return (
    <PageShell>
      <ArtworkDetail artwork={artwork} />
    </PageShell>
  );
}
