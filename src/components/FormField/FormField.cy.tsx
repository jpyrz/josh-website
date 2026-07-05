import { FormField } from "./FormField";

describe("FormField", () => {
  it("renders a labeled input", () => {
    cy.mount(<FormField label="Email" name="email" type="email" required />);

    cy.findByLabelText("Email").should("have.attr", "name", "email").and("have.attr", "required");
  });

  it("renders a textarea for multiline input", () => {
    cy.mount(<FormField label="Message" name="message" multiline />);

    cy.findByLabelText("Message").should("match", "textarea");
  });
});
