import { SocialIcon } from "./SocialIcon";

describe("SocialIcon", () => {
  it("renders each supported social icon as decorative svg", () => {
    const icons = ["instagram", "facebook", "youtube", "tiktok", "x", "linkedin", "email"] as const;

    cy.mount(
      <div>
        {icons.map((icon) => (
          <SocialIcon key={icon} icon={icon} />
        ))}
      </div>,
    );

    cy.get("svg").should("have.length", icons.length);
    cy.get("svg").each(($svg) => {
      cy.wrap($svg).should("have.attr", "aria-hidden", "true");
    });
  });

  it("renders the X icon as a filled shape", () => {
    cy.mount(<SocialIcon icon="x" />);

    cy.get("path").should("have.length", 1);
    cy.get("path").first().should("have.css", "fill").and("not.equal", "none");
  });
});
