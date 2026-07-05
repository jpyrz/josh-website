import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageShell } from "@/components/PageShell";
import { getArtistProfile } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Inquire about artwork, commissions, and studio availability.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const artist = await getArtistProfile();

  return (
    <PageShell
      heading="Contact"
      intro={`For artwork inquiries, commissions, or studio questions, send ${artist.name} a note.`}
      variant="centered"
    >
      <ContactForm />
    </PageShell>
  );
}
