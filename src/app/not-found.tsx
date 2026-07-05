import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell heading="Page not found" intro="The page you are looking for is not in the studio archive.">
      <Link href="/gallery">Return to the gallery</Link>
    </PageShell>
  );
}
