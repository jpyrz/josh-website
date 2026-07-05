import type { MetadataRoute } from "next";
import { getAllArtwork } from "@/lib/sanity/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const artwork = await getAllArtwork();
  const now = new Date();

  return [
    "",
    "/gallery",
    "/about",
    "/contact",
    ...artwork.map((piece) => `/artwork/${piece.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));
}
