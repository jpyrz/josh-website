/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/* eslint-disable @typescript-eslint/no-namespace */

import "@testing-library/cypress/add-commands";
import { mount } from "cypress/react";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);

beforeEach(() => {
  cy.document().then((document) => {
    const style = document.createElement("style");
    style.textContent = `
      :root {
        --color-ink: #1f1d1b;
        --color-muted: #6f6a62;
        --color-paper: #faf8f3;
        --color-surface: #ffffff;
        --color-line: #ddd6c8;
        --color-accent: #546a76;
        --color-accent-strong: #2f4858;
        --font-body: Arial, Helvetica, sans-serif;
        --max-page-width: 1180px;
      }
      body { margin: 0; font-family: var(--font-body); background: var(--color-paper); }
      * { box-sizing: border-box; }
      a { color: inherit; text-decoration: none; }
    `;
    document.head.appendChild(style);
  });
});
