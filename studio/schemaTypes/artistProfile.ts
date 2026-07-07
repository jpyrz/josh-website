import { defineField, defineType } from "sanity";

export const artistProfile = defineType({
  name: "artistProfile",
  title: "Artist Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "statement", title: "Artist statement", type: "text", rows: 5 }),
    defineField({
      name: "aboutKicker",
      title: "About page kicker",
      type: "string",
      initialValue: "Artist Statement",
      description: "Small label shown above the artist name on the About page.",
    }),
    defineField({
      name: "aboutDetails",
      title: "About details",
      type: "array",
      description: "Optional short details shown below the statement, such as location, mediums, focus, or inquiries.",
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
    }),
    defineField({ name: "email", title: "Email", type: "email" }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
  ],
});
