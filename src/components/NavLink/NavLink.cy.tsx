import { NavLink } from "./NavLink";

describe("NavLink", () => {
  it("renders an accessible navigation link", () => {
    cy.mount(<NavLink href="/gallery" label="Gallery" />);

    cy.findByRole("link", { name: "Gallery" }).should("have.attr", "href", "/gallery");
  });

  it("marks the current page", () => {
    cy.window().then((win) => {
      win.history.pushState({}, "", "/gallery");
    });

    cy.mount(<NavLink href="/gallery" label="Gallery" />);

    cy.findByRole("link", { name: "Gallery" }).should("have.attr", "aria-current", "page");
  });

  it("marks gallery active for artwork detail pages", () => {
    cy.window().then((win) => {
      win.history.pushState({}, "", "/artwork/cormorant");
    });

    cy.mount(<NavLink href="/gallery" label="Gallery" />);

    cy.findByRole("link", { name: "Gallery" }).should("have.attr", "aria-current", "page");
  });
});
