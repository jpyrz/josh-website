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
      name: "primaryLinkLabel",
      title: "Primary link label",
      type: "string",
      initialValue: "View gallery",
    }),
    defineField({
      name: "secondaryLinkLabel",
      title: "Secondary link label",
      type: "string",
      initialValue: "About the artist",
    }),
    defineField({
      name: "showFeaturedArtwork",
      title: "Show featured artwork section",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
