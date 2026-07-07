import { fallbackArtistProfile, fallbackContactPageSettings } from "@/lib/sanity/fallbackData";
import { ContactSection } from "./ContactSection";

describe("ContactSection", () => {
  it("renders configurable contact copy and the form", () => {
    cy.mount(<ContactSection artist={fallbackArtistProfile} settings={fallbackContactPageSettings} />);

    cy.findByRole("heading", { name: "Contact" }).should("be.visible");
    cy.contains(fallbackContactPageSettings.intro as string).should("be.visible");
    cy.findByLabelText("Name").should("be.visible");
    cy.findByLabelText("Email").should("be.visible");
    cy.findByLabelText("Message").should("be.visible");
  });

  it("renders the direct email link when enabled", () => {
    cy.mount(<ContactSection artist={fallbackArtistProfile} settings={fallbackContactPageSettings} />);

    cy.findByRole("link", { name: "Email directly" }).should(
      "have.attr",
      "href",
      `mailto:${fallbackArtistProfile.email}`,
    );
  });
});
