"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, SyntheticEvent } from "react";
import type { Artwork } from "@/lib/types";
import { ArtworkBackButton } from "@/components/ArtworkBackButton";
import { ArtworkMeta } from "@/components/ArtworkMeta";
import styles from "./ArtworkDetail.module.scss";

type ArtworkDetailProps = {
  artwork: Artwork;
};

export function ArtworkDetail({ artwork }: ArtworkDetailProps) {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState<number>();
  const [viewportMaxHeight, setViewportMaxHeight] = useState<number>();
  const displayWidth = artwork.detailDisplayWidth ?? artwork.displayWidth;
  const displayMaxHeight = artwork.detailDisplayMaxHeight ?? artwork.displayMaxHeight;
  const imageWidth = artwork.image.width || 900;
  const imageHeight = artwork.image.height || 1100;
  const imageRatio = imageWidth / imageHeight;
  const resolvedMaxHeight = displayMaxHeight || viewportMaxHeight;
  const baseWidth = displayWidth || measuredWidth;
  const resolvedWidth =
    baseWidth && resolvedMaxHeight ? Math.min(baseWidth, Math.round(resolvedMaxHeight * imageRatio)) : baseWidth;
  const frameStyle: CSSProperties = {
    width: resolvedWidth ? `${resolvedWidth}px` : "100%",
    maxWidth: "100%",
  };
  const imageStyle: CSSProperties = {
    width: "100%",
  };
  const blockImageSave = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    const imageWrap = imageWrapRef.current;

    if (!imageWrap) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setMeasuredWidth(Math.round(entry.contentRect.width));
    });

    observer.observe(imageWrap);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateViewportMaxHeight = () => {
      setViewportMaxHeight(Math.min(window.innerHeight * 0.78, 860));
    };

    updateViewportMaxHeight();
    window.addEventListener("resize", updateViewportMaxHeight);

    return () => window.removeEventListener("resize", updateViewportMaxHeight);
  }, []);

  return (
    <article className={styles.detail}>
      <div ref={imageWrapRef} className={styles.imageWrap} onContextMenu={blockImageSave} onDragStart={blockImageSave}>
        <div className={styles.imageFrame} style={frameStyle}>
          <Image
            src={artwork.image.src}
            alt={artwork.image.alt}
            width={imageWidth}
            height={imageHeight}
            priority
            sizes="(min-width: 1180px) 760px, 100vw"
            className={styles.image}
            style={imageStyle}
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
