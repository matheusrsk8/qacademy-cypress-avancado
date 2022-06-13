

it('Webapp should be only', function(){

    cy.visit('/');
    cy.title()
        .should('eq', 'Samurai Barbershop by QAninja')

})