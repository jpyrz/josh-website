import { ArtworkMeta } from "./ArtworkMeta";

describe("ArtworkMeta", () => {
  it("renders available metadata and omits empty fields", () => {
    cy.mount(<ArtworkMeta artwork={{ medium: "Oil", year: "2026", dimensions: "", status: "Available" }} />);

    cy.contains("Oil").should("be.visible");
    cy.contains("2026").should("be.visible");
    cy.contains("Available").should("be.visible");
  });
});
