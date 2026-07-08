"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { SubmitButton } from "@/components/SubmitButton";
import styles from "./ContactForm.module.scss";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const encoded = new URLSearchParams();

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        encoded.append(key, value);
      }
    });

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded.toString(),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form className={styles.form} name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="subject" value="New Josh Eco Art inquiry" />
      <p className={styles.honeypot} aria-hidden="true">
        <label>
          Leave this field empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <FormField label="Name" name="name" required />
      <FormField label="Email" name="email" type="email" required />
      <FormField label="Message" name="message" required multiline />
      <SubmitButton isSubmitting={state === "submitting"} />
      {state === "success" && <p className={styles.success}>Thanks. Your message has been sent.</p>}
      {state === "error" && <p className={styles.error}>Something went wrong. Please try again.</p>}
    </form>
  );
}
