import { fallbackArtistProfile } from "@/lib/sanity/fallbackData";
import { AboutSection } from "./AboutSection";

describe("AboutSection", () => {
  it("renders bio and statement", () => {
    cy.mount(<AboutSection artist={fallbackArtistProfile} />);

    cy.findByRole("heading", { name: fallbackArtistProfile.name }).should("be.visible");
    cy.contains(fallbackArtistProfile.bio).should("be.visible");
    cy.contains(fallbackArtistProfile.statement as string).should("be.visible");
  });

  it("renders optional about details", () => {
    cy.mount(<AboutSection artist={fallbackArtistProfile} />);

    fallbackArtistProfile.aboutDetails?.forEach((detail) => {
      cy.contains(detail.label).should("be.visible");
      cy.contains(detail.value).should("be.visible");
    });
  });

  it("renders optional artist statement paragraph sections", () => {
    cy.mount(
      <AboutSection
        artist={{
          ...fallbackArtistProfile,
          statement: "This should be replaced by paragraph sections.",
          statementParagraphs: ["First statement paragraph.", "Second statement paragraph."],
        }}
      />,
    );

    cy.contains("First statement paragraph.").should("be.visible");
    cy.contains("Second statement paragraph.").should("be.visible");
    cy.contains("This should be replaced by paragraph sections.").should("not.exist");
  });
});
