import { defineField, defineType } from "sanity";

export const homePageSettings = defineType({
  name: "homePageSettings",
  title: "Homepage Settings",
  type: "document",
  fields: [
    defineField({
      name: "eyebrowText",
      title: "Eyebrow text",
      type: "string",
      initialValue: "Artwork Portfolio",
    }),
    defineField({
      name: "headline",
      title: "Headline override",
      type: "string",
      description: "Optional. Leave blank to use the artist name from Artist Profile.",
    }),
    defineField({
      name: "intro",
      title: "Intro text override",
      type: "text",
      rows: 4,
      description: "Optional. Leave blank to use the artist statement from Artist Profile.",
    }),
    defineField({
      name: "secondaryLinkLabel",
      title: "Read more link label",
      type: "string",
      initialValue: "Read more",
      description: "Shown inline after the homepage intro text and links to the About page.",
    }),
    defineField({
      name: "showFeaturedArtwork",
      title: "Show featured artwork section",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
