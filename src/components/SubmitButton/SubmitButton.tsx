import styles from "./SubmitButton.module.scss";

type SubmitButtonProps = {
  isSubmitting?: boolean;
};

export function SubmitButton({ isSubmitting = false }: SubmitButtonProps) {
  return (
    <button className={styles.button} type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Sending" : "Send inquiry"}
    </button>
  );
}
