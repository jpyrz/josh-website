import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "artistName",
      title: "Artist name",
      type: "string",
      validation: (rule) => rule.required(),
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
    }),
    defineField({
      name: "homepageKicker",
      title: "Homepage eyebrow text",
      type: "string",
      initialValue: "Artwork Portfolio",
    }),
    defineField({
      name: "navLabels",
      title: "Navigation labels",
      type: "object",
      fields: [
        defineField({ name: "home", title: "Home", type: "string", initialValue: "Home" }),
        defineField({ name: "gallery", title: "Gallery", type: "string", initialValue: "Gallery" }),
        defineField({ name: "about", title: "About", type: "string", initialValue: "About" }),
        defineField({ name: "contact", title: "Contact", type: "string", initialValue: "Contact" }),
      ],
    }),
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
