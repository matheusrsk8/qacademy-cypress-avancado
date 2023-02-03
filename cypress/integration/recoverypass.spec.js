import forgotPassPage from '../support/pages/forgotPass'
import resetPassPage from '../support/pages/resetPass'


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
            forgotPassPage.toast.shouldHaveText('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')
        })
    })


    context.only('When user forget your pass', function(){

        before(function(){
            cy.postUser(this.data)
            cy.postRecoveryPass(this.data.email)
        })

        it('Should can recovery by email', function(){

            const token = Cypress.env('recoveryToken')

            resetPassPage.go(token)
            resetPassPage.form('newpass123', 'newpass123')
            resetPassPage.submit()
            resetPassPage.toast.shouldHaveText('Agora você já pode logar com a sua nova senha secreta.')


        })
    })

})