import { PageShell } from "./PageShell";

describe("PageShell", () => {
  it("renders heading, intro, and child content", () => {
    cy.mount(
      <PageShell heading="Gallery" intro="Selected artwork">
        <div>Grid content</div>
      </PageShell>,
    );

    cy.findByRole("heading", { name: "Gallery" }).should("be.visible");
    cy.contains("Selected artwork").should("be.visible");
    cy.contains("Grid content").should("be.visible");
  });

  it("supports centered page content", () => {
    cy.mount(
      <PageShell heading="Contact" intro="Send a note" variant="centered">
        <div>Contact form</div>
      </PageShell>,
    );

    cy.findByRole("main").should("have.class", "PageShell-module__centered");
  });
});
