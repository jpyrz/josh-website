import { fallbackArtistProfile } from "@/lib/sanity/fallbackData";
import { AboutSection } from "./AboutSection";

describe("AboutSection", () => {
  it("renders bio and statement", () => {
    cy.mount(<AboutSection artist={fallbackArtistProfile} />);

    cy.findByRole("heading", { name: fallbackArtistProfile.name }).should("be.visible");
    cy.contains(fallbackArtistProfile.bio).should("be.visible");
    cy.contains(fallbackArtistProfile.statement as string).should("be.visible");
  });
});
