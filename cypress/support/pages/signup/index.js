import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class signupPage {

    constructor() {
        this.toast = toast;
        this.alert = alert;
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

}
export default new signupPage()