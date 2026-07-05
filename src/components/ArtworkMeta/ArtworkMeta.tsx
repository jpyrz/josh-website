import type { Artwork } from "@/lib/types";
import styles from "./ArtworkMeta.module.scss";

type ArtworkMetaProps = {
  artwork: Pick<Artwork, "medium" | "year" | "dimensions" | "status" | "category">;
};

export function ArtworkMeta({ artwork }: ArtworkMetaProps) {
  const items = [
    artwork.medium,
    artwork.year,
    artwork.dimensions,
    artwork.status,
    artwork.category,
  ].filter(Boolean);

  if (!items.length) {
    return null;
  }

  return (
    <dl className={styles.meta}>
      {items.map((item) => (
        <div key={item}>
          <dd>{item}</dd>
        </div>
      ))}
    </dl>
  );
}
