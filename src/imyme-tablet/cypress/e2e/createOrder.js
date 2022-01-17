describe('Create Order', () => {
    it('login and create an order', () => {
        cy.visit('/home')
            .get('[data-testid=matching-start-button] > div')
            .click()
            .wait(5000)
        cy.matchImageSnapshot('login', {
            disableTimersAndAnimations: false,
        })
            .get('[type="email"]')
            .type('testuser@imyme.com')
            .get('[type="password"]')
            .type('123456')
            .get('[type="submit"]')
            .click()
            .wait(10000)
            .url()
            .should('match', /results/)
        cy.matchImageSnapshot('results', {
            disableTimersAndAnimations: false,
        })
            .get('.btn > .m-auto')
            .click()
            .wait(1000)
        cy.matchImageSnapshot('customize', {
            disableTimersAndAnimations: false,
        })
            .get('[type="radio"]')
            .first()
            .check()
            .get('.btn > .m-auto')
            .click()
            .wait(1000)
        cy.matchImageSnapshot('confirmation', {
            disableTimersAndAnimations: false,
        })
            .get('[type="radio"]')
            .first()
            .should('be.checked')
            .get('.btn > .m-auto')
            .click()
            .visit('/home')
    })
})
