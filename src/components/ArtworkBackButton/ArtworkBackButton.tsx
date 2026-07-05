"use client";

import styles from "./ArtworkBackButton.module.scss";

type ArtworkBackButtonProps = {
  fallbackHref?: string;
};

export function ArtworkBackButton({ fallbackHref = "/gallery" }: ArtworkBackButtonProps) {
  function handleBack() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign(fallbackHref);
  }

  return (
    <button className={styles.button} type="button" onClick={handleBack}>
      Back
    </button>
  );
}
