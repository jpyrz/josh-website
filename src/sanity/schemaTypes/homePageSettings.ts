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
      name: "showHeroArtwork",
      title: "Show artwork beside intro",
      type: "boolean",
      initialValue: true,
      description: "Adds one selected artwork beside the homepage introduction on larger screens.",
    }),
    defineField({
      name: "heroArtworks",
      title: "Hero artworks",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artwork" }] }],
      description: "Choose artworks for the homepage hero carousel. Leave blank to use featured artwork.",
      hidden: ({ parent }) => parent?.showHeroArtwork === false,
    }),
    defineField({
      name: "heroCarouselIntervalSeconds",
      title: "Hero carousel interval",
      type: "number",
      initialValue: 6,
      description: "Seconds between automatic image changes. Set to 0 to disable auto-rotation.",
      validation: (rule) => rule.min(0).max(30),
      hidden: ({ parent }) => parent?.showHeroArtwork === false,
    }),
    defineField({
      name: "heroArtwork",
      title: "Legacy single hero artwork",
      type: "reference",
      to: [{ type: "artwork" }],
      description: "Deprecated. Prefer Hero artworks above.",
      hidden: true,
    }),
    defineField({
      name: "showFeaturedArtwork",
      title: "Show featured artwork section",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
