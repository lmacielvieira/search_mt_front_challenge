// cypress/integration/spec.js
context("Simple render and routing", () => {
  it("loads page that do not exists", () => {
    cy.visit("/not-found");
    cy.get(".not-found-page");
  });

  it("loads  landing and go to manager and listing page", () => {
    cy.visit("/");
  });
});
