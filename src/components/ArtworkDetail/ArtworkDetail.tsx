import Image from "next/image";
import type { CSSProperties } from "react";
import type { Artwork } from "@/lib/types";
import { ArtworkBackButton } from "@/components/ArtworkBackButton";
import { ArtworkMeta } from "@/components/ArtworkMeta";
import styles from "./ArtworkDetail.module.scss";

type ArtworkDetailProps = {
  artwork: Artwork;
};

export function ArtworkDetail({ artwork }: ArtworkDetailProps) {
  const displayWidth = artwork.detailDisplayWidth ?? artwork.displayWidth;
  const displayMaxHeight = artwork.detailDisplayMaxHeight ?? artwork.displayMaxHeight;
  const imageStyle: CSSProperties = {
    width: displayWidth ? `${displayWidth}px` : undefined,
    maxHeight: displayMaxHeight ? `${displayMaxHeight}px` : undefined,
  };

  return (
    <article className={styles.detail}>
      <div className={styles.imageWrap}>
        <Image
          src={artwork.image.src}
          alt={artwork.image.alt}
          width={artwork.image.width || 900}
          height={artwork.image.height || 1100}
          priority
          sizes="(min-width: 1180px) 760px, 100vw"
          className={styles.image}
          style={imageStyle}
        />
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
