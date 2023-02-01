import signupPage from '../support/pages/signup'


describe('Sign Up', function () {

    before(function(){
        cy.fixture('signup').then(function(signup){
            this.success = signup.success
            this.email_inv = signup.email_inv
            this.email_dup = signup.email_dup
            this.short_password = signup.short_password
        })
    })


    context('When the barber is new', function () {


        before(function () {
            //Removendo usuário do banco antes de visitar a página
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result);
                })
        })

        it('Then, should sign up a new barber', function () {
            signupPage.go();
            signupPage.form(this.success);
            signupPage.submit();
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
        })
    })

    context('When the barber has already registered', function () {

     
        before(function () {
            cy.postUser(this.email_dup)
        })

        it('Then, should not sign up the barber', function () {

            signupPage.go();
            signupPage.form(this.email_dup);
            signupPage.submit();
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.');
        })
    })

    context('When email is incorrect', function () {

        it('Should display alert error', function () {
            signupPage.go();
            signupPage.form(this.email_inv);
            signupPage.submit();
            signupPage.alert.haveText('Informe um email válido')

        })

    })

    context('When password is very SHORT', function () {

        const passwords = ['1', 'a2', 'ab3', 'abc4', '@bcd5']

        beforeEach(function () {
            signupPage.go();
        })

        passwords.forEach(function (p) {

            it('Should deny the pass: ' + p, function () {

                this.short_password.password = p

                signupPage.form(this.short_password);
                signupPage.submit();
                signupPage.alert.haveText('Pelo menos 6 caracteres')
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
                signupPage.alert.haveText(alert)
            })
        })
    })
})