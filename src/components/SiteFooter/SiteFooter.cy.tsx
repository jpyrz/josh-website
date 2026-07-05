import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  it("centers social links when provided", () => {
    cy.mount(<SiteFooter socialLinks={[{ label: "Instagram", href: "https://example.com" }]} />);

    cy.contains("Josh").should("not.exist");
    cy.findByRole("link", { name: "Instagram" }).should("have.attr", "href", "https://example.com");
  });

  it("renders optional social icons", () => {
    cy.mount(
      <SiteFooter
        socialLinks={[{ label: "Instagram", href: "https://example.com", icon: "instagram" }]}
      />,
    );

    cy.findByRole("link", { name: "Instagram" }).within(() => {
      cy.get("svg").should("have.attr", "aria-hidden", "true");
    });
  });
});
