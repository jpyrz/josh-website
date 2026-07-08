import Link from "next/link";
import type { ArtistProfile, Artwork } from "@/lib/types";
import { ArtworkCarousel } from "@/components/ArtworkCarousel";
import styles from "./ArtistIntro.module.scss";

type ArtistIntroProps = {
  artist: ArtistProfile;
  kicker?: string;
  headline?: string;
  intro?: string;
  introParagraphs?: string[];
  secondaryLinkLabel?: string;
  heroArtworks?: Artwork[];
  heroCarouselIntervalSeconds?: number;
};

export function ArtistIntro({
  artist,
  kicker = "Artwork Portfolio",
  headline,
  intro,
  introParagraphs,
  secondaryLinkLabel = "Read more",
  heroArtworks,
  heroCarouselIntervalSeconds = 6,
}: ArtistIntroProps) {
  const fallbackIntroText = intro || artist.statement || artist.bio;
  const paragraphs = introParagraphs?.length ? introParagraphs : [fallbackIntroText];
  const readMoreLabel = secondaryLinkLabel.replace(/\s*(?:->|→)\s*$/, "");
  const artworks = heroArtworks?.length ? heroArtworks : [];

  return (
    <section className={`${styles.intro} ${artworks.length ? styles.withArtwork : ""}`}>
      <div className={styles.copy}>
        <p className={styles.kicker}>{kicker}</p>
        <h1>{headline || artist.name}</h1>
        <div className={styles.paragraphs}>
          {paragraphs.map((paragraph, index) => {
            const isLastParagraph = index === paragraphs.length - 1;

            return (
              <p key={`${paragraph}-${index}`}>
                {paragraph}
                {isLastParagraph && (
                  <>
                    {" "}
                    <Link href="/about" className={styles.readMore}>
                      {readMoreLabel}
                      <span className={styles.arrow} aria-hidden="true" />
                    </Link>
                  </>
                )}
              </p>
            );
          })}
        </div>
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
