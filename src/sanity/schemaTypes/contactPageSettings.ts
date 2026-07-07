import { defineField, defineType } from "sanity";

export const contactPageSettings = defineType({
  name: "contactPageSettings",
  title: "Contact Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Contact",
    }),
    defineField({
      name: "intro",
      title: "Intro text",
      type: "text",
      rows: 4,
      initialValue: "For commissions, available works, studio visits, or exhibition inquiries, send a note below.",
    }),
    defineField({
      name: "showImage",
      title: "Show image",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "image",
      title: "Contact image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
      description: "Optional artwork, studio photo, or detail image for the left column.",
      hidden: ({ parent }) => parent?.showImage === false,
    }),
    defineField({
      name: "showDirectEmail",
      title: "Show direct email link",
      type: "boolean",
      initialValue: true,
      description: "Uses the email from Artist Profile.",
    }),
    defineField({
      name: "emailLinkLabel",
      title: "Email link label",
      type: "string",
      initialValue: "Email directly",
      hidden: ({ parent }) => parent?.showDirectEmail === false,
    }),
  ],
});
