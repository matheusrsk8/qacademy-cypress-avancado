import dashPage from '../support/pages/dashboard'
import loginPage from '../support/pages/login'


describe('login', function(){

    context('When user is very good', function(){

        const user = {
            name: 'Ronaldo Fenomeno',
            email: 'sucess@example.com',
            password: 'pwd123'
        }

        it('Should signin', function(){
            loginPage.go();
            loginPage.form(user);
            loginPage.submit();

            dashPage.header.userLoggedIn(user);
        })

    })

})