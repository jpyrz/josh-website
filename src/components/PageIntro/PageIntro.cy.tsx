import { PageIntro } from "./PageIntro";

describe("PageIntro", () => {
  it("renders an editorial page heading", () => {
    cy.mount(<PageIntro kicker="Selected Work" heading="Gallery" intro="A quiet index of selected pieces." />);

    cy.contains("Selected Work").should("be.visible");
    cy.findByRole("heading", { name: "Gallery" }).should("be.visible");
    cy.contains("A quiet index of selected pieces.").should("be.visible");
  });
});
