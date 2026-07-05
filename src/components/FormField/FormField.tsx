import styles from "./FormField.module.scss";

type FormFieldProps = {
  label: string;
  name: string;
  type?: "text" | "email";
  required?: boolean;
  multiline?: boolean;
};

export function FormField({ label, name, type = "text", required = false, multiline = false }: FormFieldProps) {
  const id = `field-${name}`;

  return (
    <label className={styles.field} htmlFor={id}>
      <span>{label}</span>
      {multiline ? (
        <textarea id={id} name={name} required={required} rows={7} />
      ) : (
        <input id={id} name={name} type={type} required={required} />
      )}
    </label>
  );
}
