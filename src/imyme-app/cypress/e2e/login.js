describe('Login', () => {
    it('tests visual regression', () => {
        cy.visit('/login')
        cy.matchImageSnapshot('login')
    })

    it('logs in', () => {
        cy.visit('/login')
            .get('[type="email"]')
            .type('testuser@imyme.com')
            .get('[type="password"]')
            .type('123456')
            .get('[type="submit"]')
            .click()
            .wait(1000)
            .url()
            .should('eq', `${Cypress.config().baseUrl}/`)
    })

    it('tries to log in with a bad password', () => {
        cy.visit('/login')
            .get('[type="email"]')
            .type('testuser@imyme.com')
            .get('[type="password"]')
            .type('333333')
            .get('[type="submit"]')
            .click()
            .wait(1000)
            .url()
            .should('eq', `${Cypress.config().baseUrl}/login`)
    })
})
