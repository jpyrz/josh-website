import { fallbackArtwork } from "@/lib/sanity/fallbackData";
import { ArtworkCard } from "./ArtworkCard";

describe("ArtworkCard", () => {
  it("renders artwork image, title, and metadata link", () => {
    cy.mount(<ArtworkCard artwork={fallbackArtwork[0]} />);

    cy.findByRole("img", { name: fallbackArtwork[0].image.alt }).should("be.visible");
    cy.findByRole("link", { name: fallbackArtwork[0].title }).should(
      "have.attr",
      "href",
      `/artwork/${fallbackArtwork[0].slug}`,
    );
    cy.contains(fallbackArtwork[0].medium as string).should("be.visible");
  });

  it("applies author-controlled gallery sizing", () => {
    cy.mount(
      <ArtworkCard
        artwork={{
          ...fallbackArtwork[0],
          galleryDisplayWidth: 240,
          galleryDisplayMaxHeight: 240,
        }}
      />,
    );

    cy.findByRole("article").should("have.attr", "style").and("include", "width: 240px");
    cy.findByRole("img", { name: fallbackArtwork[0].image.alt }).should("have.attr", "style").and("include", "240px");
  });

  it("fills the grid column when gallery width is not customized", () => {
    cy.mount(<ArtworkCard artwork={fallbackArtwork[0]} />);

    cy.findByRole("article").should("have.attr", "style").and("include", "width: 100%");
  });
});
