import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("renders the artist brand and main links", () => {
    cy.viewport(1024, 768);
    cy.mount(<SiteHeader artistName="Josh" />);

    cy.findByRole("link", { name: "Josh" }).should("have.attr", "href", "/");
    cy.findByRole("navigation", { name: "Main navigation" }).within(() => {
      cy.findByRole("link", { name: "Home" }).should("have.attr", "href", "/");
      cy.findByRole("link", { name: "Gallery" }).should("have.attr", "href", "/gallery");
      cy.findByRole("link", { name: "About" }).should("have.attr", "href", "/about");
      cy.findByRole("link", { name: "Contact" }).should("have.attr", "href", "/contact");
    });
  });

  it("renders an uploaded brand logo when provided", () => {
    cy.mount(
      <SiteHeader
        artistName="Josh"
        brandLogo={{
          src: "/artwork/study-in-blue.svg",
          alt: "Josh studio mark",
          width: 200,
          height: 80,
        }}
      />,
    );

    cy.findByRole("img", { name: "Josh studio mark" }).should("have.attr", "src", "/artwork/study-in-blue.svg");
  });

  it("toggles the mobile navigation menu", () => {
    cy.viewport(390, 760);
    cy.mount(<SiteHeader artistName="Josh" />);

    cy.findByRole("button", { name: "Toggle navigation menu" }).as("menuButton");
    cy.get("@menuButton").should("have.attr", "aria-expanded", "false");
    cy.get("#site-navigation").should("not.be.visible");

    cy.get("@menuButton").click();

    cy.get("@menuButton").should("have.attr", "aria-expanded", "true");
    cy.get("#site-navigation").should("be.visible");
  });

  it("adds a shadow state after scrolling", () => {
    cy.mount(
      <div style={{ minHeight: "160vh" }}>
        <SiteHeader artistName="Josh" />
      </div>,
    );

    cy.findByRole("banner").should("not.have.class", "SiteHeader-module__scrolled");
    cy.scrollTo(0, 80);
    cy.findByRole("banner").should("have.class", "SiteHeader-module__scrolled");
  });
});
