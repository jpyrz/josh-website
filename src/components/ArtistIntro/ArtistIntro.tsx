import Link from "next/link";
import type { ArtistProfile, Artwork } from "@/lib/types";
import { ArtworkCarousel } from "@/components/ArtworkCarousel";
import styles from "./ArtistIntro.module.scss";

type ArtistIntroProps = {
  artist: ArtistProfile;
  kicker?: string;
  headline?: string;
  intro?: string;
  secondaryLinkLabel?: string;
  heroArtwork?: Artwork;
  heroArtworks?: Artwork[];
  heroCarouselIntervalSeconds?: number;
};

export function ArtistIntro({
  artist,
  kicker = "Artwork Portfolio",
  headline,
  intro,
  secondaryLinkLabel = "Read more",
  heroArtwork,
  heroArtworks,
  heroCarouselIntervalSeconds = 6,
}: ArtistIntroProps) {
  const introText = intro || artist.statement || artist.bio;
  const readMoreLabel = secondaryLinkLabel.replace(/\s*(?:->|→)\s*$/, "");
  const artworks = heroArtworks?.length ? heroArtworks : heroArtwork ? [heroArtwork] : [];

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
        <ArtworkCarousel
          artwork={artworks}
          autoRotateIntervalMs={heroCarouselIntervalSeconds * 1000}
          className={styles.carousel}
          priority
        />
      )}
    </section>
  );
}
