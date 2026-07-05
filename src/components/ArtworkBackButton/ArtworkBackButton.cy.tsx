import { ArtworkBackButton } from "./ArtworkBackButton";

describe("ArtworkBackButton", () => {
  it("goes back through browser history", () => {
    cy.window().then((win) => {
      cy.stub(win.history, "back").as("back");
    });

    cy.mount(<ArtworkBackButton />);

    cy.findByRole("button", { name: "Back" }).click();
    cy.get("@back").should("have.been.calledOnce");
  });
});
