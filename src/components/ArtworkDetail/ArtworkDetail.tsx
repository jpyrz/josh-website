"use client";

import Image from "next/image";
import type { CSSProperties, SyntheticEvent } from "react";
import type { Artwork } from "@/lib/types";
import { ArtworkBackButton } from "@/components/ArtworkBackButton";
import { ArtworkMeta } from "@/components/ArtworkMeta";
import styles from "./ArtworkDetail.module.scss";

type ArtworkDetailProps = {
  artwork: Artwork;
};

export function ArtworkDetail({ artwork }: ArtworkDetailProps) {
  const displayWidth = artwork.detailDisplayWidth;
  const displayMaxHeight = artwork.detailDisplayMaxHeight;
  const imageWidth = artwork.image.width || 900;
  const imageHeight = artwork.image.height || 1100;
  const frameStyle: CSSProperties = {
    "--detail-image-max-width": displayWidth ? `${displayWidth}px` : undefined,
    "--detail-image-max-height": displayMaxHeight ? `${displayMaxHeight}px` : undefined,
    "--detail-image-ratio": imageWidth / imageHeight,
  } as CSSProperties;
  const blockImageSave = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <article className={styles.detail}>
      <div className={styles.imageWrap} onContextMenu={blockImageSave} onDragStart={blockImageSave}>
        <div className={styles.imageFrame} style={frameStyle}>
          <Image
            src={artwork.image.src}
            alt={artwork.image.alt}
            width={imageWidth}
            height={imageHeight}
            priority
            sizes="(min-width: 1180px) 760px, 100vw"
            className={styles.image}
            draggable={false}
          />
        </div>
      </div>
      <div className={styles.content}>
        <ArtworkBackButton />
        <h1>{artwork.title}</h1>
        <ArtworkMeta artwork={artwork} />
        {artwork.description && <p>{artwork.description}</p>}
      </div>
    </article>
  );
}
