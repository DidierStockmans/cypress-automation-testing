describe("My first test suite", () => {
  it("My First case", () => {
    // visit the url
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");

    // get the search input, and type `ca`
    cy.get(".search-keyword").type("ca");

    // wait for 2 secs
    cy.wait(2000);

    // test if we find 4 products when searching for `ca`
    // added :visible to selector to only count the visible items
    cy.get(".product:visible").should("have.length", 4);

    // decrease the scope where cypress will look for elements by first getting the .products
    // then get the .products in that element
    cy.get(".products")
      .find(".product")
      .should("have.length", 4);

    // select all the .product elements from .products, then select the third element (.eq(2))
    // search for the button using the contains method and then click
    cy.get(".products")
      .find(".product")
      .eq(2)
      .contains("ADD TO CART")
      .click();

    // instead of finding a product by order (which can change in the website), let's iterate
    // over the products and find the product by name
    cy.get(".products")
      .find(".product")
      .each(($el, index, $list) => {
        const productName = $el.find(".product-name").text();
        if (productName.includes("Cashews")) {
          $el.find("button").click();
        }
      });
  });
});
