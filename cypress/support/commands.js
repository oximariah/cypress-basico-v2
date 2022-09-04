Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Oxi')
    cy.get('#lastName').type('Maria')
    cy.get('#email').type('oxi@oxi.com')
    cy.get('#open-text-area').type('teste, teste')
    cy.get('.button').click()
})