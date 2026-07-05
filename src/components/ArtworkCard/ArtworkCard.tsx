import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Artwork } from "@/lib/types";
import { ArtworkMeta } from "@/components/ArtworkMeta";
import styles from "./ArtworkCard.module.scss";

type ArtworkCardProps = {
  artwork: Artwork;
  priority?: boolean;
};

export function ArtworkCard({ artwork, priority = false }: ArtworkCardProps) {
  const displayWidth = artwork.galleryDisplayWidth ?? artwork.displayWidth;
  const displayMaxHeight = artwork.galleryDisplayMaxHeight ?? artwork.displayMaxHeight;
  const cardStyle: CSSProperties = {
    width: displayWidth ? `${displayWidth}px` : "100%",
    maxWidth: "100%",
  };
  const imageStyle: CSSProperties = {
    maxHeight: displayMaxHeight ? `${displayMaxHeight}px` : undefined,
  };

  return (
    <article className={styles.card} style={cardStyle}>
      <Link href={`/artwork/${artwork.slug}`} className={styles.imageLink} aria-label={`View ${artwork.title}`}>
        <Image
          src={artwork.image.src}
          alt={artwork.image.alt}
          width={artwork.image.width || 900}
          height={artwork.image.height || 1100}
          priority={priority}
          sizes="(min-width: 1180px) 360px, (min-width: 720px) 33vw, 100vw"
          className={styles.image}
          style={imageStyle}
        />
      </Link>
      <div className={styles.caption}>
        <h2>
          <Link href={`/artwork/${artwork.slug}`}>{artwork.title}</Link>
        </h2>
        <ArtworkMeta artwork={artwork} />
      </div>
    </article>
  );
}
