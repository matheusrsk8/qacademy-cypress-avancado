import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class loginPage {

    constructor() {
        this.toast = toast;
        this.alert = alert;
    }

    go(token){
        cy.visit('/reset-password?token=' + token);
    }

    form(pass, confirmPass){
        cy.get(el.pass).clear().type(pass);
        cy.get(el.confirmPass).clear().type(confirmPass);
    }

    submit(){
        cy.contains(el.btnChangePass)
            .click();
    }

}

export default new loginPage()