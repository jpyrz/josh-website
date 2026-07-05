import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("submits to the Netlify form skeleton and shows success", () => {
    cy.intercept("POST", "/__forms.html", { statusCode: 200 }).as("submitContact");
    cy.mount(<ContactForm />);

    cy.findByLabelText("Name").type("Taylor");
    cy.findByLabelText("Email").type("taylor@example.com");
    cy.findByLabelText("Message").type("I am interested in a painting.");
    cy.findByRole("button", { name: "Send inquiry" }).click();

    cy.wait("@submitContact");
    cy.contains("Thanks. Your message has been sent.").should("be.visible");
  });

  it("shows an error when submission fails", () => {
    cy.intercept("POST", "/__forms.html", { statusCode: 500 }).as("submitContact");
    cy.mount(<ContactForm />);

    cy.findByLabelText("Name").type("Taylor");
    cy.findByLabelText("Email").type("taylor@example.com");
    cy.findByLabelText("Message").type("I am interested in a painting.");
    cy.findByRole("button", { name: "Send inquiry" }).click();

    cy.wait("@submitContact");
    cy.contains("Something went wrong. Please try again.").should("be.visible");
  });
});
