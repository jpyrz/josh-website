import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { PageShell } from "@/components/PageShell";
import { getArtistProfile, getContactPageSettings } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Inquire about artwork, commissions, and studio availability.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [artist, settings] = await Promise.all([getArtistProfile(), getContactPageSettings()]);

  return (
    <PageShell>
      <ContactSection artist={artist} settings={settings} />
    </PageShell>
  );
}
