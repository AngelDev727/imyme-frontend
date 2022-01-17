describe('Home', () => {
    it('tests visual regression', () => {
        cy.visit('/')
        cy.get('.footer-section').scrollIntoView({duration: 20000})
        cy.get('.hero').scrollIntoView()
        cy.matchImageSnapshot('home', {
            disableTimersAndAnimations: true,
        }).wait(2000)
        cy.get('#essence')
            .scrollIntoView()
            .get('[data-testid="essence-19"]')
            .click()
            .wait(1000)
        cy.matchImageSnapshot('essence-modal', {
            disableTimersAndAnimations: true,
        })
    })
})
