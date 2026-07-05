import { fallbackArtistProfile } from "@/lib/sanity/fallbackData";
import { ArtistIntro } from "./ArtistIntro";

describe("ArtistIntro", () => {
  it("renders artist information and primary links", () => {
    cy.mount(<ArtistIntro artist={fallbackArtistProfile} />);

    cy.findByRole("heading", { name: fallbackArtistProfile.name }).should("be.visible");
    cy.findByRole("link", { name: "View gallery" }).should("have.attr", "href", "/gallery");
    cy.findByRole("link", { name: "About the artist" }).should("have.attr", "href", "/about");
  });

  it("renders homepage copy overrides", () => {
    cy.mount(
      <ArtistIntro
        artist={fallbackArtistProfile}
        kicker="New work"
        headline="Studio archive"
        intro="A rotating selection of drawings and paintings."
        primaryLinkLabel="Browse work"
        secondaryLinkLabel="Read bio"
      />,
    );

    cy.contains("New work").should("be.visible");
    cy.findByRole("heading", { name: "Studio archive" }).should("be.visible");
    cy.contains("A rotating selection of drawings and paintings.").should("be.visible");
    cy.findByRole("link", { name: "Browse work" }).should("have.attr", "href", "/gallery");
    cy.findByRole("link", { name: "Read bio" }).should("have.attr", "href", "/about");
  });
});
