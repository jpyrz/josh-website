import Image from "next/image";
import type { ArtistProfile, ContactPageSettings } from "@/lib/types";
import { ContactForm } from "@/components/ContactForm";
import { SocialIcon } from "@/components/SocialIcon";
import styles from "./ContactSection.module.scss";

type ContactSectionProps = {
  artist: ArtistProfile;
  settings: ContactPageSettings;
};

export function ContactSection({ artist, settings }: ContactSectionProps) {
  const heading = settings.heading || "Contact";
  const intro =
    settings.intro ||
    `For commissions, available works, studio visits, or exhibition inquiries, send ${artist.name} a note below.`;
  const shouldShowEmail = settings.showDirectEmail !== false && artist.email;
  const image = settings.showImage !== false ? settings.image : undefined;

  return (
    <section className={styles.section}>
      <div className={styles.context}>
        <div>
          <h1>{heading}</h1>
          <p>{intro}</p>
        </div>

        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width || 900}
            height={image.height || 1100}
            sizes="(min-width: 900px) 34vw, 86vw"
            className={styles.image}
          />
        )}

        {(shouldShowEmail || artist.socialLinks.length > 0) && (
          <div className={styles.direct}>
            {shouldShowEmail && (
              <a href={`mailto:${artist.email}`} className={styles.emailLink}>
                {settings.emailLinkLabel || "Email directly"}
              </a>
            )}
            {artist.socialLinks.length > 0 && (
              <nav aria-label="Contact social links" className={styles.socialLinks}>
                {artist.socialLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                    {link.icon ? <SocialIcon icon={link.icon} /> : link.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        )}
      </div>

      <ContactForm />
    </section>
  );
}
