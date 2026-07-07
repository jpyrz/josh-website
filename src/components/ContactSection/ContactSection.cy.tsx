import { ContactSection } from "./ContactSection";

describe("ContactSection", () => {
  it("renders the contact form", () => {
    cy.mount(<ContactSection />);

    cy.findByLabelText("Name").should("be.visible");
    cy.findByLabelText("Email").should("be.visible");
    cy.findByLabelText("Message").should("be.visible");
  });
});
