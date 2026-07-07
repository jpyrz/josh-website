import Image from "next/image";
import Link from "next/link";
import type { ArtistProfile, Artwork } from "@/lib/types";
import styles from "./ArtistIntro.module.scss";

type ArtistIntroProps = {
  artist: ArtistProfile;
  kicker?: string;
  headline?: string;
  intro?: string;
  secondaryLinkLabel?: string;
  heroArtwork?: Artwork;
  heroArtworks?: Artwork[];
};

export function ArtistIntro({
  artist,
  kicker = "Artwork Portfolio",
  headline,
  intro,
  secondaryLinkLabel = "Read more",
  heroArtwork,
  heroArtworks,
}: ArtistIntroProps) {
  const introText = intro || artist.statement || artist.bio;
  const readMoreLabel = secondaryLinkLabel.replace(/\s*(?:->|→)\s*$/, "");
  const artworks = (heroArtworks?.length ? heroArtworks : heroArtwork ? [heroArtwork] : []).slice(0, 3);

  return (
    <section className={`${styles.intro} ${artworks.length ? styles.withArtwork : ""}`}>
      <div className={styles.copy}>
        <p className={styles.kicker}>{kicker}</p>
        <h1>{headline || artist.name}</h1>
        <p>
          {introText}{" "}
          <Link href="/about" className={styles.readMore}>
            {readMoreLabel}
            <span className={styles.arrow} aria-hidden="true" />
          </Link>
        </p>
      </div>
      {artworks.length > 0 && (
        <div className={styles.artworkGroup} data-count={artworks.length}>
          {artworks.map((artwork) => (
            <Link
              key={artwork.id}
              href={`/artwork/${artwork.slug}`}
              className={styles.artworkLink}
              aria-label={`View ${artwork.title}`}
            >
              <Image
                src={artwork.image.src}
                alt={artwork.image.alt}
                width={artwork.image.width || 900}
                height={artwork.image.height || 1100}
                sizes="(min-width: 960px) 26vw, 86vw"
                className={styles.artworkImage}
                priority
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
