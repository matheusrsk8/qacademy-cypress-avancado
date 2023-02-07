import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dashboard'

describe('dashboard', function(){

    context('when the customer makes an appointment in the mobile app', function(){

        const data = {
            customer: {
                name: "Matheus Common",
                email: "common@email.com",
                password: "pwd123",
                is_provider: false
            },      
            provider: {
                name: "Matheus Barber",
                email: "barber@email.com",
                password: "pwd123",
                is_provider: true
            },
            appointmentHour: '14:00'
        }

        before(function(){
            cy.postUser(data.provider)
            cy.postUser(data.customer)
            cy.apiUserLogin(data.customer)
            cy.setProviderId(data.provider.email)
            cy.createAppointment(data.appointmentHour)
        })

        it('then this information must be displayed', function(){

            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(Cypress.env('appointmentDay'))
            dashPage.appointmentShouldBeVisbile(data.customer, data.appointmentHour)
            

        })

    })
})
