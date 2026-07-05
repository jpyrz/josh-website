import type { ReactNode } from "react";
import styles from "./PageShell.module.scss";

type PageShellProps = {
  children: ReactNode;
  heading?: string;
  intro?: string;
  variant?: "default" | "home" | "centered";
};

export function PageShell({ children, heading, intro, variant = "default" }: PageShellProps) {
  return (
    <main
      className={`${styles.shell} ${variant === "home" ? styles.home : ""} ${
        variant === "centered" ? styles.centered : ""
      }`}
    >
      {(heading || intro) && (
        <header className={styles.header}>
          {heading && <h1>{heading}</h1>}
          {intro && <p>{intro}</p>}
        </header>
      )}
      {children}
    </main>
  );
}
