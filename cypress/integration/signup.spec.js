import signupPage from '../support/pages/signup'


describe('Sign Up', function () {

    context('When the barber is new', function () {

        const barber = {
            name: 'Matheus Rocha',
            email: 'new@email.com',
            password: 'pwd123'
        }

        before(function () {
            //Removendo usuário do banco antes de visitar a página
            cy.task('removeUser', barber.email)
                .then(function (result) {
                    console.log(result);
                })
        })

        it('Then, should sign up a new barber', function () {
            signupPage.go();
            signupPage.form(barber);
            signupPage.submit();
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
        })
    })

    context('When the barber has already registered', function () {

        const barber = {
            name: 'Matheus Rocha',
            email: 'registered@email.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {

            cy.task('removeUser', barber.email)
                .then(function (result) {
                    cy.log(result);
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                barber
            )
        })

        it('Then, should not sign up the barber', function () {

            signupPage.go();
            signupPage.form(barber);
            signupPage.submit();
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.');
        })
    })

    context('When email is incorrect', function () {

        const barber = {
            name: 'Matheus Rocha',
            email: 'matheus.example.com',
            password: 'pwd123'
        }

        it('Should display alert error', function () {
            signupPage.go();
            signupPage.form(barber);
            signupPage.submit();
            signupPage.alertHaveText('Informe um email válido')

        })

    })

    context('When password is very SHORT', function () {

        const passwords = ['1', 'a2', 'ab3', 'abc4', '@bcd5']

        beforeEach(function () {
            signupPage.go();
        })

        passwords.forEach(function (p) {

            const barber = {
                name: 'Matheus Rocha',
                email: 'matheus@example.com',
                password: p
            }

            it('Should deny the pass: ' + p, function () {
                signupPage.form(barber);
                signupPage.submit();
                signupPage.alertHaveText('Pelo menos 6 caracteres')
            })
        })
    })

    context('When i dont fill required field', function () {

        const alertMessage = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go();
            signupPage.submit();
        })

        alertMessage.forEach(function (alert) {
            it('Should display message: ' + alert, function () {
                signupPage.alertHaveText(alert)
            })
        })
    })
})