import { el } from './elements'

class Header {

    userLoggedIn(user) {
        cy.get(el.fullName)
            .should('be.visible')
            .should('have.text', user.name)
    }

}

export default new Header()