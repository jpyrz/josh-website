import Image from "next/image";
import type { ArtistProfile } from "@/lib/types";
import styles from "./AboutSection.module.scss";

type AboutSectionProps = {
  artist: ArtistProfile;
};

export function AboutSection({ artist }: AboutSectionProps) {
  return (
    <section className={styles.about}>
      {artist.portrait && (
        <Image
          src={artist.portrait.src}
          alt={artist.portrait.alt}
          width={artist.portrait.width || 900}
          height={artist.portrait.height || 1100}
          className={styles.portrait}
        />
      )}
      <div className={styles.copy}>
        <h2>{artist.name}</h2>
        <p>{artist.bio}</p>
        {artist.statement && <p>{artist.statement}</p>}
      </div>
    </section>
  );
}
