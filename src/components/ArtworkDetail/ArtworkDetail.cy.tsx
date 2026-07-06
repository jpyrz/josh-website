import { fallbackArtwork } from "@/lib/sanity/fallbackData";
import { ArtworkDetail } from "./ArtworkDetail";

describe("ArtworkDetail", () => {
  it("renders detail content for an artwork", () => {
    cy.mount(<ArtworkDetail artwork={fallbackArtwork[0]} />);

    cy.findByRole("heading", { name: fallbackArtwork[0].title }).should("be.visible");
    cy.findByRole("button", { name: "Back" }).should("be.visible");
    cy.contains(fallbackArtwork[0].description as string).should("be.visible");
  });

  it("applies author-controlled display sizing", () => {
    cy.mount(
      <ArtworkDetail
        artwork={{
          ...fallbackArtwork[0],
          detailDisplayWidth: 240,
          detailDisplayMaxHeight: 240,
        }}
      />,
    );

    cy.findByRole("img", { name: fallbackArtwork[0].image.alt }).should("have.attr", "style").and("include", "240px");
  });

  it("marks the artwork image as not draggable", () => {
    cy.mount(<ArtworkDetail artwork={fallbackArtwork[0]} />);

    cy.findByRole("img", { name: fallbackArtwork[0].image.alt }).should("have.attr", "draggable", "false");
  });
});
