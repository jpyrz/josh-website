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

  it("switches artwork with previous and next controls", () => {
    cy.mount(<ArtworkCarousel artwork={fallbackArtwork.slice(0, 3)} />);

    cy.findByRole("button", { name: "Show next artwork" }).click();
    cy.findByRole("link", { name: `View ${fallbackArtwork[1].title}` }).should("be.visible");

    cy.findByRole("button", { name: "Show previous artwork" }).click();
    cy.findByRole("link", { name: `View ${fallbackArtwork[0].title}` }).should("be.visible");

    cy.findByRole("button", { name: "Show previous artwork" }).click();
    cy.findByRole("link", { name: `View ${fallbackArtwork[2].title}` }).should("be.visible");
  });

  it("auto-rotates using the configured interval", () => {
    cy.clock();
    cy.mount(<ArtworkCarousel artwork={fallbackArtwork.slice(0, 2)} autoRotateIntervalMs={1500} />);

    cy.findByRole("link", { name: `View ${fallbackArtwork[0].title}` }).should("be.visible");
    cy.tick(1500);
    cy.findByRole("link", { name: `View ${fallbackArtwork[1].title}` }).should("be.visible");
  });

  it("resets the auto-rotate timer after manual navigation", () => {
    cy.clock();
    cy.mount(<ArtworkCarousel artwork={fallbackArtwork.slice(0, 2)} autoRotateIntervalMs={10000} />);

    cy.tick(8000);
    cy.findByRole("button", { name: "Show next artwork" }).click();
    cy.findByRole("link", { name: `View ${fallbackArtwork[1].title}` }).should("be.visible");

    cy.tick(1999);
    cy.findByRole("link", { name: `View ${fallbackArtwork[1].title}` }).should("be.visible");

    cy.tick(8001);
    cy.findByRole("link", { name: `View ${fallbackArtwork[0].title}` }).should("be.visible");
  });

  it("pauses auto-rotation while hovered", () => {
    cy.clock();
    cy.mount(<ArtworkCarousel artwork={fallbackArtwork.slice(0, 2)} autoRotateIntervalMs={1500} />);

    cy.findByLabelText("Featured artwork slides").trigger("mouseenter");
    cy.tick(2500);
    cy.findByRole("link", { name: `View ${fallbackArtwork[0].title}` }).should("be.visible");

    cy.findByLabelText("Featured artwork slides").trigger("mouseout");
    cy.tick(1500);
    cy.findByRole("link", { name: `View ${fallbackArtwork[1].title}` }).should("be.visible");
  });

  it("omits dot controls for a single artwork", () => {
    cy.mount(<ArtworkCarousel artwork={fallbackArtwork.slice(0, 1)} />);

    cy.findByRole("button", { name: /Show/ }).should("not.exist");
  });
});
