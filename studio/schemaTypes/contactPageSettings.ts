import { defineField, defineType } from "sanity";

export const contactPageSettings = defineType({
  name: "contactPageSettings",
  title: "Contact Page Settings",
  type: "document",
  groups: [
    { name: "intro", title: "Page intro", default: true },
  ],
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Contact",
      group: "intro",
    }),
    defineField({
      name: "intro",
      title: "Intro text",
      type: "text",
      rows: 4,
      initialValue: "For commissions, available works, studio visits, or exhibition inquiries, send a note below.",
      description: "Text shown above the contact form.",
      group: "intro",
    }),
  ],
});
