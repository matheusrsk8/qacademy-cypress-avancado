// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import {apiServer} from '../../cypress.json'
import moment from 'moment'
import loginPage from './pages/login'
import dashPage from './pages/dashboard'

//App Action
Cypress.Commands.add('uiLogin', function(user){
    loginPage.go();
    loginPage.form(user);
    loginPage.submit();
    dashPage.header.userLoggedIn(user);
})

Cypress.Commands.add('postUser', function (user) {
    //Removendo usuário do banco antes de visitar a página
    cy.task('removeUser', user.email)
        .then(function (result) {
            console.log(result);
        })

    cy.request(
        'POST',
        apiServer+'/users',
        user
    ).then(function (response) {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('postRecoveryPass', function(email){
    cy.request({
        method: 'POST',
        url: apiServer+'/password/forgot',
        body: { email: email }
    }).then(function (response) {
        expect(response.status).to.eq(204)

        cy.task('findToken', email)
            .then(function (result) {
                // console.log(result.token)
                Cypress.env('recoveryToken', result.token)
            })

    })
})

Cypress.Commands.add('createAppointment', function(hour){

    let now = new Date()
    now.setDate(now.getDate() +1)

    const date = moment(now).format(`YYYY-MM-DD ${hour}:00`)

    Cypress.env('appointmentDate', now)

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: date
    }

    cy.request({
        method: 'POST',
        url: apiServer+'/appointments',
        body: payload,
        headers: {
            authorization: 'Bearer ' + Cypress.env('tokenApi')
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)
    })

})


Cypress.Commands.add('setProviderId', function(email){

    cy.request({
        method: 'GET',
        url: apiServer+'/providers',
        headers: {
            authorization: 'Bearer ' + Cypress.env('tokenApi')
        }       
    }).then(function (response) {
        expect(response.status).to.eq(200)

        const providersList = response.body

        providersList.forEach(function(provider){
            if(provider.email === email) {
                Cypress.env('providerId', provider.id)  
            }
        })
    })
})

Cypress.Commands.add('apiUserLogin', function(user, localStorage = false){

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: apiServer+ '/sessions',
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200)
        Cypress.env('tokenApi', response.body.token)

        const {token, user} = response.body

        if(localStorage) {
            window.localStorage.setItem('@Samurai:token', token)
            window.localStorage.setItem('@Samurai:user', JSON.stringify(user))  
        }
    })

    if(localStorage){
        cy.visit('/dashboard')
    }
    
})