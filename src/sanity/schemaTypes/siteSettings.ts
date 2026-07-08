import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Logo & navigation", default: true },
    { name: "footer", title: "Footer/social links" },
    { name: "seo", title: "Browser & search" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      description: "Used for the browser tab and search/social previews.",
      validation: (rule) => rule.required(),
      group: "seo",
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
      description: "Short description used by search engines and link previews.",
      validation: (rule) => rule.required(),
      group: "seo",
    }),
    defineField({
      name: "artistName",
      title: "Text logo / artist name",
      type: "string",
      description: "Shown in the top-left navigation when no logo image is uploaded.",
      validation: (rule) => rule.required(),
      group: "identity",
    }),
    defineField({
      name: "brandLogo",
      title: "Brand logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the logo for screen readers.",
        }),
      ],
      description: "Optional. If uploaded, this replaces the text name in the top-left navigation.",
      group: "identity",
    }),
    defineField({
      name: "navLabels",
      title: "Navigation labels",
      type: "object",
      description: "Optional labels for the main navigation links.",
      group: "identity",
      fields: [
        defineField({ name: "home", title: "Home", type: "string", initialValue: "Home" }),
        defineField({ name: "gallery", title: "Gallery", type: "string", initialValue: "Gallery" }),
        defineField({ name: "about", title: "About", type: "string", initialValue: "About" }),
        defineField({ name: "contact", title: "Contact", type: "string", initialValue: "Contact" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Footer social links",
      type: "array",
      description: "Shown as centered links/icons in the site footer.",
      group: "footer",
      of: [
        {
          type: "object",
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Human-readable name, such as Instagram or Email.",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "href", title: "URL", type: "url", validation: (rule) => rule.required() }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Optional. Leave blank to show the label as text.",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "X", value: "x" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Email", value: "email" },
                ],
                layout: "dropdown",
              },
            }),
          ],
        },
      ],
    }),
  ],
});
