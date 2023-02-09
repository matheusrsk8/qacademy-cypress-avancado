import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dashboard'
import {provider,customer,appointment} from '../support/factories/dashboard'

describe('dashboard', function(){

    context('when the customer makes an appointment in the mobile app', function(){

        // const data = {
        //     customer: {
        //         name: "Matheus Common",
        //         email: "common@email.com",
        //         password: "pwd123",
        //         is_provider: false
        //     },      
        //     provider: {
        //         name: "Matheus Barber",
        //         email: "barber@email.com",
        //         password: "pwd123",
        //         is_provider: true
        //     },
        //     appointmentHour: '14:00'
        // }

        before(function(){
            cy.postUser(provider)
            cy.postUser(customer)
            cy.apiUserLogin(customer)
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('then this information must be displayed', function(){

            cy.apiUserLogin(provider, true)

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(Cypress.env('appointmentDate'))
            dashPage.appointmentShouldBeVisbile(customer, appointment.hour)
            

        })

    })
})
