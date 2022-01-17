describe('Home', () => {
    it('tests visual regression', () => {
        cy.visit('/home')
        cy.scrollTo('bottom', {duration: 20000})
        cy.scrollTo('top')
        cy.matchImageSnapshot('home', {
            disableTimersAndAnimations: true,
        })
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
