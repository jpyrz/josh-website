"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, SyntheticEvent } from "react";
import type { Artwork } from "@/lib/types";
import { ArtworkMeta } from "@/components/ArtworkMeta";
import styles from "./ArtworkCard.module.scss";

type ArtworkCardProps = {
  artwork: Artwork;
  priority?: boolean;
};

export function ArtworkCard({ artwork, priority = false }: ArtworkCardProps) {
  const displayWidth = artwork.galleryDisplayWidth;
  const displayMaxHeight = artwork.galleryDisplayMaxHeight;
  const imageWidth = artwork.image.width || 900;
  const imageHeight = artwork.image.height || 1100;
  const cardStyle: CSSProperties = {
    "--gallery-image-max-width": displayWidth ? `${displayWidth}px` : undefined,
    "--gallery-image-max-height": displayMaxHeight ? `${displayMaxHeight}px` : undefined,
    "--gallery-image-ratio": imageWidth / imageHeight,
  } as CSSProperties;
  const blockImageSave = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <article className={styles.card} style={cardStyle}>
      <Link
        href={`/artwork/${artwork.slug}`}
        className={styles.imageLink}
        aria-label={`View ${artwork.title}`}
        onContextMenu={blockImageSave}
        onDragStart={blockImageSave}
      >
        <Image
          src={artwork.image.src}
          alt={artwork.image.alt}
          width={imageWidth}
          height={imageHeight}
          priority={priority}
          sizes="(min-width: 1180px) 360px, (min-width: 720px) 33vw, 100vw"
          className={styles.image}
          draggable={false}
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
