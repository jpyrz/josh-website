import type { Artwork } from "@/lib/types";
import { ArtworkCard } from "@/components/ArtworkCard";
import styles from "./ArtworkGrid.module.scss";

type ArtworkGridProps = {
  artwork: Artwork[];
};

export function ArtworkGrid({ artwork }: ArtworkGridProps) {
  if (!artwork.length) {
    return <p className={styles.empty}>Artwork will appear here once the first pieces are published.</p>;
  }

  return (
    <section className={styles.grid} aria-label="Artwork gallery">
      {artwork.map((piece, index) => (
        <ArtworkCard key={piece.id} artwork={piece} priority={index < 2} />
      ))}
    </section>
  );
}
