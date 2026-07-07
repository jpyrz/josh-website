import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { PageIntro } from "@/components/PageIntro";
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
      <PageIntro
        kicker="Studio Inquiries"
        heading={settings.heading || "Contact"}
        align="center"
        intro={
          settings.intro ||
          `For commissions, available works, studio visits, or exhibition inquiries, send ${artist.name} a note below.`
        }
      />
      <ContactSection />
    </PageShell>
  );
}
