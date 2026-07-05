import { fallbackArtwork } from "@/lib/sanity/fallbackData";
import { ArtworkGrid } from "./ArtworkGrid";

describe("ArtworkGrid", () => {
  it("renders a card for each artwork item", () => {
    cy.mount(<ArtworkGrid artwork={fallbackArtwork.slice(0, 2)} />);

    cy.findByLabelText("Artwork gallery").should("be.visible");
    cy.findAllByRole("article").should("have.length", 2);
  });

  it("renders an empty state", () => {
    cy.mount(<ArtworkGrid artwork={[]} />);

    cy.contains("Artwork will appear here").should("be.visible");
  });
});
