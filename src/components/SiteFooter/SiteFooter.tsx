import type { SocialLink } from "@/lib/types";
import { SocialIcon } from "@/components/SocialIcon";
import styles from "./SiteFooter.module.scss";

type SiteFooterProps = {
  socialLinks?: SocialLink[];
};

export function SiteFooter({ socialLinks = [] }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      {socialLinks.length > 0 && (
        <nav aria-label="Social links" className={styles.links}>
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={link.icon ? styles.iconLink : undefined}
              aria-label={link.label}
              title={link.label}
            >
              {link.icon ? <SocialIcon icon={link.icon} /> : link.label}
            </a>
          ))}
        </nav>
      )}
    </footer>
  );
}
