import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class forgotPassPage {

    constructor() {
        this.toast = toast;
        this.alert = alert;
    }

    go() {
        cy.visit('/forgot-password');
        cy.contains(el.title).should('be.visible')
    }

    form(email) {
        cy.get(el.inputEmail).type(email);

    }

    submit() {
        cy.contains(el.btnRecuperar, 'Recuperar').click();
    }

}
export default new forgotPassPage()