describe("Handling alerts, popups, child windows", () => {
  it("Alerts and popups", () => {
    // cypress auto accepts all alerts and popups, listen for an event to catch the alert/popup

    // open url
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // click on button to trigger window alert
    cy.get("#alertbtn").click();

    // click on button to trigger window confirm
    cy.get("#confirmbtn").click();

    // catch the window alert and assert the text
    cy.on("window:alert", str => {
      expect(str).to.equal(
        "Hello , share this practice page and share your knowledge"
      );
    });

    // catch the window confirm and assert the text
    cy.on("window:confirm", str => {
      expect(str).to.equal("Hello , Are you sure you want to confirm?");
    });

    // To test links opening in a different tab we need to remove the target attribute from that link,
    // so the link will open in the same tab.
    // There's no way in Cypress to find out of a link will open in a new tab
    // To remove the target attribute from the link, we can use Cypress's invoke function.
    // invoke takes a jQuery function name as a string as the first attribute, and attributes for that
    // jQuery function as a second attribute
    cy.get("#opentab")
      .invoke("removeAttr", "target")
      .click();

    cy.url().should("include", "rahulshettyacademy.com");

    // go back with the back button of the browser
    cy.go("back");

    // find a particular row in a table by comparing the text, then go to the next DOM element to get the price
    cy.get("tr td:nth-child(2)").each(($el, index) => {
      const courseName = $el.text();
      if (courseName.includes("Python")) {
        // next() is not a Cypress method so it wont resolve in a promise, we have to do that manually
        cy.get("tr td:nth-child(2)")
          .eq(index)
          .next()
          .then(priceTableCell => {
            const priceText = priceTableCell.text();
            expect(priceText).to.equal("25");
          });
      }
    });

    // click an item that only shows on mouse over
    // option 1: Find the hidden element and invoke the jQuery show method
    cy.get(".mouse-hover-content").invoke("show");
    cy.contains("Top").click();
    cy.url().should("include", "#top");

    // option 2: Click the hidden element by using the force option
    cy.go("back");
    cy.contains("Top").click({ force: true });
    cy.url().should("include", "#top");
  });
});
