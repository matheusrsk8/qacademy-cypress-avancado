import { el } from './elements'
import toast from '../../components/toast'

class signupPage {

    constructor() {
        this.toast = toast;
    }

    go() {
        cy.visit('/signup');
    }

    form(barber) {
        cy.get(el.name).type(barber.name);
        cy.get(el.email).type(barber.email);
        cy.get(el.password).type(barber.password);
    }

    submit() {
        cy.contains(el.signupButton).click();
    }

    alertHaveText(expectedText){
        cy.contains('.alert-error', expectedText)
            .should('be.visible');
    }

}
export default new signupPage()