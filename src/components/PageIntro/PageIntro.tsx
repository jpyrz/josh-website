import styles from "./PageIntro.module.scss";

type PageIntroProps = {
  kicker: string;
  heading: string;
  intro?: string;
  align?: "left" | "center";
};

export function PageIntro({ kicker, heading, intro, align = "left" }: PageIntroProps) {
  return (
    <header className={`${styles.intro} ${align === "center" ? styles.center : ""}`}>
      <p className={styles.kicker}>{kicker}</p>
      <h1>{heading}</h1>
      {intro && <p className={styles.copy}>{intro}</p>}
    </header>
  );
}
