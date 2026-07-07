import { fallbackArtwork } from "@/lib/sanity/fallbackData";
import { ArtworkCarousel } from "./ArtworkCarousel";

describe("ArtworkCarousel", () => {
  it("renders the first artwork as a linked image", () => {
    cy.mount(<ArtworkCarousel artwork={fallbackArtwork.slice(0, 2)} />);

    cy.findByRole("link", { name: `View ${fallbackArtwork[0].title}` }).should(
      "have.attr",
      "href",
      `/artwork/${fallbackArtwork[0].slug}`,
    );
    cy.findByRole("img", { name: fallbackArtwork[0].image.alt }).should("be.visible");
  });

  it("switches artwork with dot controls", () => {
    cy.mount(<ArtworkCarousel artwork={fallbackArtwork.slice(0, 2)} />);

    cy.findByRole("button", { name: `Show ${fallbackArtwork[1].title}` }).click();

    cy.findByRole("link", { name: `View ${fallbackArtwork[1].title}` }).should(
      "have.attr",
      "href",
      `/artwork/${fallbackArtwork[1].slug}`,
    );
    cy.findByRole("img", { name: fallbackArtwork[1].image.alt }).should("be.visible");
  });

  it("auto-rotates using the configured interval", () => {
    cy.clock();
    cy.mount(<ArtworkCarousel artwork={fallbackArtwork.slice(0, 2)} autoRotateIntervalMs={1500} />);

    cy.findByRole("link", { name: `View ${fallbackArtwork[0].title}` }).should("be.visible");
    cy.tick(1500);
    cy.findByRole("link", { name: `View ${fallbackArtwork[1].title}` }).should("be.visible");
  });

  it("omits dot controls for a single artwork", () => {
    cy.mount(<ArtworkCarousel artwork={fallbackArtwork.slice(0, 1)} />);

    cy.findByRole("button", { name: /Show/ }).should("not.exist");
  });
});
