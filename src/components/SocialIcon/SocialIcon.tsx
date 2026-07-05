import type { SocialLink } from "@/lib/types";
import styles from "./SocialIcon.module.scss";

type SocialIconProps = {
  icon: NonNullable<SocialLink["icon"]>;
};

export function SocialIcon({ icon }: SocialIconProps) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {icon === "instagram" && (
        <>
          <rect x="5" y="5" width="14" height="14" rx="4" />
          <circle cx="12" cy="12" r="3.4" />
          <circle cx="16.2" cy="7.8" r="0.8" className={styles.filled} />
        </>
      )}
      {icon === "facebook" && (
        <path d="M13.6 21v-7h2.4l0.4-3h-2.8V9.1c0-0.9 0.3-1.5 1.6-1.5h1.4V4.9c-0.7-0.1-1.5-0.2-2.3-0.2-2.4 0-4 1.5-4 4.1V11H8v3h2.3v7h3.3z" />
      )}
      {icon === "youtube" && (
        <>
          <rect x="3.6" y="7" width="16.8" height="10" rx="3" />
          <path d="M10.4 9.8v4.4l4.2-2.2-4.2-2.2z" className={styles.cutout} />
        </>
      )}
      {icon === "tiktok" && (
        <path d="M14.4 4.4c0.4 2 1.6 3.3 3.6 3.7v3c-1.4 0-2.6-0.4-3.6-1.1v5.3c0 3.2-2.1 5.3-5 5.3-2.5 0-4.4-1.7-4.4-4.1 0-2.6 2.1-4.4 5.1-4.2v3.1c-1.1-0.2-2 0.3-2 1.1 0 0.7 0.6 1.2 1.4 1.2 1 0 1.7-0.7 1.7-2.1V4.4h3.2z" />
      )}
      {icon === "x" && (
        <path d="M14.2 10.8 20.3 4h-2.7l-4.7 5.2L9.2 4H4l6.4 8.8L4 20h2.7l5-5.6 4.1 5.6H21l-6.8-9.2Zm-1.8 2-1.1-1.5-4.8-6.8h1.6l3.9 5.5 1.1 1.5 5.3 7.5h-1.6l-4.4-6.2Z" />
      )}
      {icon === "linkedin" && (
        <>
          <rect x="5" y="9.4" width="3" height="9.6" />
          <circle cx="6.5" cy="6.4" r="1.6" className={styles.filled} />
          <path d="M11 9.4h2.9v1.3c0.6-0.9 1.5-1.5 2.8-1.5 2.2 0 3.3 1.5 3.3 4.1V19h-3v-5.2c0-1.2-0.5-1.9-1.5-1.9s-1.6 0.8-1.6 2V19H11V9.4z" />
        </>
      )}
      {icon === "email" && (
        <>
          <rect x="4" y="6.5" width="16" height="11" rx="2" />
          <path d="M5.4 8.2l6.6 5.1 6.6-5.1" className={styles.stroked} />
        </>
      )}
    </svg>
  );
}
