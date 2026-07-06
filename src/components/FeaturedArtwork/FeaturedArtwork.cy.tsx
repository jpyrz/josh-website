import { fallbackArtwork } from "@/lib/sanity/fallbackData";
import { FeaturedArtwork } from "./FeaturedArtwork";

describe("FeaturedArtwork", () => {
  it("renders featured artwork with a gallery link", () => {
    cy.mount(<FeaturedArtwork artwork={fallbackArtwork.slice(0, 2)} />);

    cy.findByRole("heading", { name: "Featured Work" }).should("be.visible");
    cy.findByRole("link", { name: "View gallery" }).should("have.attr", "href", "/gallery");
  });
});
