import { fallbackArtwork } from "@/lib/sanity/fallbackData";
import { FeaturedArtwork } from "./FeaturedArtwork";

describe("FeaturedArtwork", () => {
  it("renders featured artwork with a gallery link", () => {
    cy.mount(<FeaturedArtwork artwork={fallbackArtwork.slice(0, 2)} />);

    cy.findByRole("heading", { name: "Featured Work" }).should("be.visible");
    cy.findByRole("link", { name: "View gallery" }).should("have.attr", "href", "/gallery");
  });

  it("renders configurable heading and gallery link label", () => {
    cy.mount(<FeaturedArtwork artwork={fallbackArtwork.slice(0, 2)} heading="Selected Pieces" linkLabel="Browse work" />);

    cy.findByRole("heading", { name: "Selected Pieces" }).should("be.visible");
    cy.findByRole("link", { name: "Browse work" }).should("have.attr", "href", "/gallery");
  });
});
