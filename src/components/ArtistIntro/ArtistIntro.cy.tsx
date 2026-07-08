import { fallbackArtistProfile, fallbackArtwork } from "@/lib/sanity/fallbackData";
import { ArtistIntro } from "./ArtistIntro";

describe("ArtistIntro", () => {
  it("renders artist information and an inline about link", () => {
    cy.mount(<ArtistIntro artist={fallbackArtistProfile} />);

    cy.findByRole("heading", { name: fallbackArtistProfile.name }).should("be.visible");
    cy.findByRole("link", { name: "Read more" }).should("have.attr", "href", "/about");
    cy.findByRole("link", { name: "View gallery" }).should("not.exist");
  });

  it("renders homepage copy overrides", () => {
    cy.mount(
      <ArtistIntro
        artist={fallbackArtistProfile}
        kicker="New work"
        headline="Studio archive"
        intro="A rotating selection of drawings and paintings."
        secondaryLinkLabel="Read bio"
      />,
    );

    cy.contains("New work").should("be.visible");
    cy.findByRole("heading", { name: "Studio archive" }).should("be.visible");
    cy.contains("A rotating selection of drawings and paintings.").should("be.visible");
    cy.findByRole("link", { name: "Read bio" }).should("have.attr", "href", "/about");
  });

  it("renders an optional hero artwork link", () => {
    cy.mount(<ArtistIntro artist={fallbackArtistProfile} heroArtworks={[fallbackArtwork[0]]} />);

    cy.findByRole("link", { name: `View ${fallbackArtwork[0].title}` }).should(
      "have.attr",
      "href",
      `/artwork/${fallbackArtwork[0].slug}`,
    );
    cy.findByRole("img", { name: fallbackArtwork[0].image.alt }).should("be.visible");
  });

  it("renders optional hero artworks in a carousel", () => {
    cy.viewport(1200, 800);
    cy.mount(<ArtistIntro artist={fallbackArtistProfile} heroArtworks={fallbackArtwork.slice(0, 3)} />);

    cy.findByRole("link", { name: `View ${fallbackArtwork[0].title}` }).should(
      "have.attr",
      "href",
      `/artwork/${fallbackArtwork[0].slug}`,
    );
    cy.findByRole("button", { name: `Show ${fallbackArtwork[1].title}` }).click();
    cy.findByRole("link", { name: `View ${fallbackArtwork[1].title}` }).should(
      "have.attr",
      "href",
      `/artwork/${fallbackArtwork[1].slug}`,
    );
  });
});
