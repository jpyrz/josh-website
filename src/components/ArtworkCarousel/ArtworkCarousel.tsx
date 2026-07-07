"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Artwork } from "@/lib/types";
import styles from "./ArtworkCarousel.module.scss";

type ArtworkCarouselProps = {
  artwork: Artwork[];
  autoRotateIntervalMs?: number;
  className?: string;
  priority?: boolean;
};

export function ArtworkCarousel({ artwork, autoRotateIntervalMs = 6000, className, priority = false }: ArtworkCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const safeCurrentIndex = currentIndex <= artwork.length - 1 ? currentIndex : 0;
  const showControls = artwork.length > 1;

  function showPreviousArtwork() {
    setCurrentIndex((index) => (index - 1 + artwork.length) % artwork.length);
  }

  function showNextArtwork() {
    setCurrentIndex((index) => (index + 1) % artwork.length);
  }

  useEffect(() => {
    const shouldAutoRotate = artwork.length > 1 && autoRotateIntervalMs > 0;

    if (!shouldAutoRotate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % artwork.length);
    }, autoRotateIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [artwork.length, autoRotateIntervalMs]);

  if (!artwork.length) {
    return null;
  }

  return (
    <div className={`${styles.carousel} ${className || ""}`} aria-label="Featured artwork carousel">
      <div className={styles.stage}>
        {artwork.map((piece, index) => {
          const isActive = index === safeCurrentIndex;
          const imageWidth = piece.image.width || 900;
          const imageHeight = piece.image.height || 1100;
          const slideStyle = {
            "--carousel-image-ratio": imageWidth / imageHeight,
          } as CSSProperties;

          return (
            <Link
              key={piece.id}
              href={`/artwork/${piece.slug}`}
              className={`${styles.slide} ${isActive ? styles.activeSlide : ""}`}
              aria-label={`View ${piece.title}`}
              aria-hidden={!isActive}
              style={slideStyle}
              tabIndex={isActive ? undefined : -1}
            >
              <Image
                src={piece.image.src}
                alt={piece.image.alt}
                width={imageWidth}
                height={imageHeight}
                sizes="(min-width: 960px) 54vw, 86vw"
                className={styles.image}
                priority={priority && index === 0}
              />
            </Link>
          );
        })}
      </div>

      {showControls && (
        <div className={styles.controls} aria-label="Choose featured artwork">
          <button type="button" className={styles.arrow} aria-label="Show previous artwork" onClick={showPreviousArtwork}>
            <span aria-hidden="true">&lt;</span>
          </button>

          <div className={styles.dots}>
            {artwork.map((piece, index) => (
              <button
                key={piece.id}
                type="button"
                className={`${styles.dot} ${index === safeCurrentIndex ? styles.activeDot : ""}`}
                aria-label={`Show ${piece.title}`}
                aria-current={index === safeCurrentIndex ? "true" : undefined}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <button type="button" className={styles.arrow} aria-label="Show next artwork" onClick={showNextArtwork}>
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>
      )}
    </div>
  );
}
