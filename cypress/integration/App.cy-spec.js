// cypress/integration/spec.js
context("Simple render and routing", () => {
  it("loads page that do not exists", () => {
    cy.visit("/not-found");
    cy.get(".not-found-page");
  });

  it("loads  landing and go to manager and listing page", () => {
    cy.visit("/");

    // opens create category modal
    cy.get(".keyword-table-component-btn").click();

    // check if submit button is disabled
    cy.get(".category-form-modal-component");
    cy.get(".cancelBtn").click();
    cy.get(".category-form-modal-component").should("not.be.visible");

    // opens create category modal
    cy.get(".keyword-table-component-btn").click();

    // check if submit button is disabled
    cy.get(".category-form-modal-component");
    cy.get(".okBtn").should("be.disabled");

    // check if submit button is not disabled afted filling
    cy.get(".category-form-modal-component-input").eq(0).type("duck");
    cy.get(".okBtn").should("not.be.disabled");
    cy.get(".okBtn").click();

    // check if duck was added
    cy.wait(500);
    cy.contains("duck");

    // delete duck
    cy.get(".anticon-delete").last().click();
    cy.get(".ant-btn-primary").contains("Yes").click();
    cy.get(".ant-table-cell").should("not.have.value", "duck");
  });
});
