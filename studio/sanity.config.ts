import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "artist-portfolio",
  title: "Artist Portfolio",
  projectId: "8wndmg6n",
  dataset: "production",
  apiVersion: "2026-07-05",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
