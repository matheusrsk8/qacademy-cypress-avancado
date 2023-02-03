import forgotPassPage from '../support/pages/forgotPass'

describe('Recovery Pass', function(){

    before(function(){
        cy.fixture('recovery').then(function(recovery){
            this.data = recovery
        })
    })

    context('When user forget your pass', function(){

        before(function(){
            cy.postUser(this.data)
        })

        it('Should can recovery by email', function(){

            forgotPassPage.go()
            forgotPassPage.form(this.data.email)
            forgotPassPage.submit()


        })
    })

})