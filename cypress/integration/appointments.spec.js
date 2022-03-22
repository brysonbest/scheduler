describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "http://localhost:8001/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it.skip("should book an interview", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it.skip("should edit an interview", () => {
    cy.get("[alt=Edit").first().click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Steven Bobby");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Steven Bobby");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete").first().click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});

// cancel
// Visits the root of our web server
// Clicks the delete button for the existing appointment
// Clicks the confirm button
// Sees that the appointment slot is empty
