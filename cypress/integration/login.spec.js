import dashPage from '../support/pages/dashboard'
import loginPage from '../support/pages/login'


describe('login', function () {

    context('When user is very good', function () {

        const user = {
            name: 'Ronaldo Fenomeno',
            email: 'sucess@example.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            //     //Removendo usuário do banco antes de visitar a página
            //     cy.task('removeUser', user.email)
            //         .then(function (result) {
            //             console.log(result);
            //         })

            //     cy.request(
            //         'POST',
            //         'http://localhost:3333/users',
            //         user
            //     ).then(function (response) {
            //         expect(response.status).to.eq(200)
            //     })
            cy.postUser(user)
        })

        it('Should signin', function () {
            loginPage.go();
            loginPage.form(user);
            loginPage.submit();

            dashPage.header.userLoggedIn(user);
        })

    })

    context('When user is good but pass is incorrect', function () {

        let user = {
            name: 'Ronaldo Gaucho',
            email: 'passincorrect@example.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function () {
                user.password = 'abc123'
            })

        })

        it('Then, should to show an error notification', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

        })
    })

    context.only('When email format is incorrect', function () {

        const emails = [
            '@gmail.com',
            'example.com.br',
            'example',
            'e',
            '123'
        ]

        before(function () {
            loginPage.go()
        })

        emails.forEach(function (email) {

            it('Then, should not to accept this email: ' + email, function () {
                const user = { email: email, password: 'pwd123' }

                loginPage.form(user)
                loginPage.submit()
                loginPage.alertHaveText('Informe um email válido')

            })

        })
    })

})