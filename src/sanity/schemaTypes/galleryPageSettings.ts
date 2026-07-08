import { defineField, defineType } from "sanity";

export const galleryPageSettings = defineType({
  name: "galleryPageSettings",
  title: "Gallery Page Settings",
  type: "document",
  groups: [
    { name: "intro", title: "Page intro", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "kicker",
      title: "Small label",
      type: "string",
      initialValue: "Selected Work",
      description: "Small uppercase label shown above the Gallery heading.",
      group: "intro",
    }),
    defineField({
      name: "heading",
      title: "Page heading",
      type: "string",
      initialValue: "Gallery",
      group: "intro",
    }),
    defineField({
      name: "intro",
      title: "Intro text",
      type: "text",
      rows: 3,
      initialValue: "A quiet index of selected pieces, studies, and available work.",
      group: "intro",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      description: "Optional browser/search title. Leave blank to use the page heading.",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      description: "Optional search description. Leave blank to use the intro text.",
      group: "seo",
    }),
  ],
});
