import Image from "next/image";
import type { ArtistProfile } from "@/lib/types";
import styles from "./AboutSection.module.scss";

type AboutSectionProps = {
  artist: ArtistProfile;
};

export function AboutSection({ artist }: AboutSectionProps) {
  const details = artist.aboutDetails?.filter((detail) => detail.label && detail.value) || [];
  const leadText = artist.statement || artist.bio;
  const showBio = Boolean(artist.statement && artist.bio);

  return (
    <section className={styles.about}>
      <div className={styles.copy}>
        <p className={styles.kicker}>{artist.aboutKicker || "Artist Statement"}</p>
        <h1>{artist.name}</h1>
        <p className={styles.statement}>{leadText}</p>

        {details.length > 0 && (
          <dl className={styles.details}>
            {details.map((detail) => (
              <div key={`${detail.label}-${detail.value}`}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {showBio && (
          <div className={styles.bio}>
            <h2>Bio</h2>
            <p>{artist.bio}</p>
          </div>
        )}
      </div>

      {artist.portrait && (
        <figure className={styles.figure}>
          <Image
            src={artist.portrait.src}
            alt={artist.portrait.alt}
            width={artist.portrait.width || 900}
            height={artist.portrait.height || 1100}
            className={styles.portrait}
          />
        </figure>
      )}
    </section>
  );
}
