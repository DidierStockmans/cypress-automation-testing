/// <reference types="Cypress />
/// <reference type="cypress-iframe" />
import "cypress-iframe";

describe("Frames Test", () => {
  it("Demo example", () => {
    // open url
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // load the iframe
    cy.frameLoaded("#courses-iframe");

    // click on an element in the iframe, by using iframe() before the find method
    cy.iframe()
      .find('a[href="#/mentorship"]')
      .eq(0)
      .click();

    // let's validate that there are 2 packages on the page
    cy.iframe()
      .find('h1[class*="pricing-title"]')
      .should("have.length", 2);
  });
});
