import { defineField, defineType } from "sanity";

export const artistProfile = defineType({
  name: "artistProfile",
  title: "Artist Profile",
  type: "document",
  groups: [
    { name: "about", title: "About page", default: true },
    { name: "portrait", title: "Portrait image" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
      group: "about",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 5,
      description: "Shown in the Bio section when an artist statement is also provided.",
      validation: (rule) => rule.required(),
      group: "about",
    }),
    defineField({
      name: "statement",
      title: "Artist statement",
      type: "text",
      rows: 5,
      description: "Main text shown prominently on the About page and used as the homepage intro fallback.",
      group: "about",
    }),
    defineField({
      name: "aboutKicker",
      title: "About page kicker",
      type: "string",
      initialValue: "Artist Statement",
      description: "Small label shown above the artist name on the About page.",
      group: "about",
    }),
    defineField({
      name: "aboutDetails",
      title: "About details",
      type: "array",
      description: "Optional short details shown below the statement, such as location, mediums, focus, or inquiries.",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        },
      ],
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
      description: "Image shown at the top of the About page on mobile and beside the statement on desktop.",
      group: "portrait",
    }),
  ],
});
