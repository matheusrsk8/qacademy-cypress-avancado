import { el } from './elements'

class loginPage {

    go(){
        cy.visit('/');
    }

    form(user){
        cy.get(el.email).clear().type(user.email);
        cy.get(el.password).clear().type(user.password);
    }

    submit(){
        cy.contains(el.signin)
            .click();
    }

    alertHaveText(expectedMessage){
        cy.contains(el.alertError, expectedMessage)
            .should('be.visible')
    }

}

export default new loginPage()