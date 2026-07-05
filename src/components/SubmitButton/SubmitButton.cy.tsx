import { SubmitButton } from "./SubmitButton";

describe("SubmitButton", () => {
  it("shows disabled submitting state", () => {
    cy.mount(<SubmitButton isSubmitting />);

    cy.findByRole("button", { name: "Sending" }).should("be.disabled");
  });
});
