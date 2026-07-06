import Link from "next/link";
import type { Artwork } from "@/lib/types";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import styles from "./FeaturedArtwork.module.scss";

type FeaturedArtworkProps = {
  artwork: Artwork[];
};

export function FeaturedArtwork({ artwork }: FeaturedArtworkProps) {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>Featured Work</h2>
        <Link href="/gallery">
          View gallery
          <span className={styles.arrow} aria-hidden="true" />
        </Link>
      </div>
      <ArtworkGrid artwork={artwork} />
    </section>
  );
}
