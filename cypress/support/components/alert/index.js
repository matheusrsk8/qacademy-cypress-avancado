import { el } from './elements'

class Alert {

    haveText(expectedMessage){
        cy.contains(el.error, expectedMessage)
            .should('be.visible')

    }
}

export default new Alert()