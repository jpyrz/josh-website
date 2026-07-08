import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "artist-portfolio",
  title: "Artist Portfolio",
  projectId: "8wndmg6n",
  dataset: "production",
  apiVersion: "2026-07-05",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Artwork")
              .schemaType("artwork")
              .child(S.documentTypeList("artwork").title("Artwork")),
            S.divider(),
            S.listItem()
              .title("Artist Profile / About Page")
              .schemaType("artistProfile")
              .child(S.documentTypeList("artistProfile").title("Artist Profile / About Page")),
            S.listItem()
              .title("Homepage")
              .schemaType("homePageSettings")
              .child(S.documentTypeList("homePageSettings").title("Homepage")),
            S.listItem()
              .title("Gallery Page")
              .schemaType("galleryPageSettings")
              .child(S.documentTypeList("galleryPageSettings").title("Gallery Page")),
            S.listItem()
              .title("Contact Page")
              .schemaType("contactPageSettings")
              .child(S.documentTypeList("contactPageSettings").title("Contact Page")),
            S.listItem()
              .title("Site Settings / Header & Footer")
              .schemaType("siteSettings")
              .child(S.documentTypeList("siteSettings").title("Site Settings / Header & Footer")),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
