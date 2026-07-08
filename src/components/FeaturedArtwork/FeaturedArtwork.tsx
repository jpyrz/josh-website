import Link from "next/link";
import type { Artwork } from "@/lib/types";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import styles from "./FeaturedArtwork.module.scss";

type FeaturedArtworkProps = {
  artwork: Artwork[];
  heading?: string;
  linkLabel?: string;
};

export function FeaturedArtwork({ artwork, heading = "Featured Work", linkLabel = "View gallery" }: FeaturedArtworkProps) {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>{heading}</h2>
        <Link href="/gallery">
          {linkLabel}
          <span className={styles.arrow} aria-hidden="true" />
        </Link>
      </div>
      <ArtworkGrid artwork={artwork} />
    </section>
  );
}
