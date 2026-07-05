import Link from "next/link";
import type { ArtistProfile } from "@/lib/types";
import styles from "./ArtistIntro.module.scss";

type ArtistIntroProps = {
  artist: ArtistProfile;
  kicker?: string;
  headline?: string;
  intro?: string;
  primaryLinkLabel?: string;
  secondaryLinkLabel?: string;
};

export function ArtistIntro({
  artist,
  kicker = "Artwork Portfolio",
  headline,
  intro,
  primaryLinkLabel = "View gallery",
  secondaryLinkLabel = "About the artist",
}: ArtistIntroProps) {
  return (
    <section className={styles.intro}>
      <p className={styles.kicker}>{kicker}</p>
      <h1>{headline || artist.name}</h1>
      <p>{intro || artist.statement || artist.bio}</p>
      <div className={styles.actions}>
        <Link href="/gallery">{primaryLinkLabel}</Link>
        <Link href="/about">{secondaryLinkLabel}</Link>
      </div>
    </section>
  );
}
