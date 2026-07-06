import { fallbackArtistProfile } from "@/lib/sanity/fallbackData";
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
});
