import { defineField, defineType } from "sanity";

export const artwork = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "medium", title: "Medium", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "dimensions", title: "Dimensions", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["Available", "Sold", "Private collection", "Not for sale"],
      },
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 100 }),
    defineField({
      name: "displayWidth",
      title: "Legacy display width",
      type: "number",
      description: "Deprecated shared display width. Prefer the gallery/detail-specific fields below.",
      validation: (rule) => rule.min(240).max(1400),
      hidden: true,
    }),
    defineField({
      name: "displayMaxHeight",
      title: "Legacy display max height",
      type: "number",
      description: "Deprecated shared max height. Prefer the gallery/detail-specific fields below.",
      validation: (rule) => rule.min(240).max(1200),
      hidden: true,
    }),
    defineField({
      name: "galleryDisplayWidth",
      title: "Gallery display width",
      type: "number",
      description: "Optional width in pixels for this artwork in the gallery grid. Leave blank for automatic sizing.",
      validation: (rule) => rule.min(160).max(900),
    }),
    defineField({
      name: "galleryDisplayMaxHeight",
      title: "Gallery max height",
      type: "number",
      description: "Optional maximum height in pixels for this artwork in the gallery grid. Leave blank for automatic sizing.",
      validation: (rule) => rule.min(160).max(900),
    }),
    defineField({
      name: "detailDisplayWidth",
      title: "Detail page display width",
      type: "number",
      description: "Optional width in pixels for this artwork on its detail page. Leave blank for automatic sizing.",
      validation: (rule) => rule.min(240).max(1400),
    }),
    defineField({
      name: "detailDisplayMaxHeight",
      title: "Detail page max height",
      type: "number",
      description: "Optional maximum height in pixels for this artwork on its detail page. Leave blank for automatic sizing.",
      validation: (rule) => rule.min(240).max(1200),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "medium",
      media: "image",
    },
  },
});
