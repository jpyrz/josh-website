import { ContactForm } from "@/components/ContactForm";
import styles from "./ContactSection.module.scss";

export function ContactSection() {
  return (
    <section className={styles.section}>
      <ContactForm />
    </section>
  );
}
