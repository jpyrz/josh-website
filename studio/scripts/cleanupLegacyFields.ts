import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-07-05" });

const cleanupTargets = [
  {
    type: "artwork",
    fields: ["displayWidth", "displayMaxHeight"],
  },
  {
    type: "artistProfile",
    fields: ["email", "socialLinks"],
  },
  {
    type: "homePageSettings",
    fields: ["heroArtwork"],
  },
  {
    type: "contactPageSettings",
    fields: ["showImage", "image", "showDirectEmail", "emailLinkLabel"],
  },
  {
    type: "siteSettings",
    fields: ["homepageKicker"],
  },
];

async function cleanupLegacyFields() {
  let updatedCount = 0;

  for (const target of cleanupTargets) {
    const fieldChecks = target.fields.map((field) => `defined(${field})`).join(" || ");
    const ids = await client.fetch<string[]>(`*[_type == $type && (${fieldChecks})]._id`, {
      type: target.type,
    });

    if (!ids.length) {
      console.log(`No legacy fields found for ${target.type}.`);
      continue;
    }

    const transaction = client.transaction();

    ids.forEach((id) => {
      transaction.patch(id, (patch) => patch.unset(target.fields));
    });

    await transaction.commit();
    updatedCount += ids.length;
    console.log(`Removed legacy fields from ${ids.length} ${target.type} document(s).`);
  }

  console.log(`Cleanup complete. Updated ${updatedCount} document(s).`);
}

cleanupLegacyFields().catch((error) => {
  console.error(error);
  process.exit(1);
});
