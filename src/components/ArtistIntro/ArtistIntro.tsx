import Link from "next/link";
import type { ArtistProfile } from "@/lib/types";
import styles from "./ArtistIntro.module.scss";

type ArtistIntroProps = {
  artist: ArtistProfile;
  kicker?: string;
  headline?: string;
  intro?: string;
  secondaryLinkLabel?: string;
};

export function ArtistIntro({
  artist,
  kicker = "Artwork Portfolio",
  headline,
  intro,
  secondaryLinkLabel = "Read more",
}: ArtistIntroProps) {
  const introText = intro || artist.statement || artist.bio;
  const readMoreLabel = secondaryLinkLabel.replace(/\s*(?:->|→)\s*$/, "");

  return (
    <section className={styles.intro}>
      <p className={styles.kicker}>{kicker}</p>
      <h1>{headline || artist.name}</h1>
      <p>
        {introText}{" "}
        <Link href="/about" className={styles.readMore}>
          {readMoreLabel}
          <span className={styles.arrow} aria-hidden="true" />
        </Link>
      </p>
    </section>
  );
}
