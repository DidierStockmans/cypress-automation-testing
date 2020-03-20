describe("My second test suite", () => {
  it("My First case", () => {
    // visit the url
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // select the first checkbox and check it
    cy.get("#checkBoxOption1")
      .check()
      .should("be.checked");

    // select the first checkbox and uncheck and assert that it's unchecked and it's value is option1
    cy.get("#checkBoxOption1")
      .uncheck()
      .should("not.be.checked")
      .and("have.value", "option1");

    // find all checkboxes but only check the second and third options
    cy.get('input[type="checkbox"]').check(["option2", "option3"]);

    // finding a static dropdown (select) , select option 2 and assert that the select's value is now option2
    cy.get("select")
      .select("option2")
      .should("have.value", "option2");

    // selecting an option in a dynamic dropdown (ie. with js, not html select element)
    // first type `be`, we want to select `Belgium`, iterate over the option and select the correct one

    // first try by myself was wrong, we can do this using cy methods only, without using then chaining. See below
    // cy.get("#autocomplete")
    //   .type("be")
    //   .then(() => {
    //     cy.get("#ui-id-1")
    //       .find("li")
    //       .each(($el, index, $list) => {
    //         if ($el.text() === "Belgium") {
    //           $el.click();
    //         }
    //       });
    //   })
    //   .then(() => {
    //     cy.get("#autocomplete").should("be.value", "Belgium");
    //   });

    // find autocomplete input and type 'be'
    cy.get("#autocomplete").type("be");

    // find all the divs in the autocomplete box and check which one contains the text 'Belgium'
    cy.get(".ui-menu-item div").each($el => {
      if ($el.text() === "Belgium") {
        // click the element
        $el.click();
      }
    });

    // assert that the autocomplete input now has value 'Belgium'
    cy.get("#autocomplete").should("have.value", "Belgium");

    // hide & show the input and assert if it's visible/invisible after click
    cy.get("#displayed-text").should("be.visible");
    cy.get("#hide-textbox").click();
    cy.get("#displayed-text").should("not.be.visible");
    cy.get("#show-textbox").click();
    cy.get("#displayed-text").should("be.visible");

    // check radio button, assert that it's checked
    cy.get('[value="radio2"]')
      .check()
      .should("be.checked");
  });
});
