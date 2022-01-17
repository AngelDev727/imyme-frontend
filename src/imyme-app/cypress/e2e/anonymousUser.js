describe('Take survey as anonymous user', () => {
    before(function() {
        sessionStorage.removeItem('surveyAnswers')
    })

    it('take the survey without logging in', () => {
        cy.visit('/')
            .getByText(/matching start/i)
            .click()
            .wait(1000)
        cy.matchImageSnapshot('surveyStart', {
            disableTimersAndAnimations: false,
        })
            .getByText(/start/i)
            .click()
            .url()
            .should('match', /1/)
            .wait(3000)
        cy.matchImageSnapshot('q1', {
            disableTimersAndAnimations: false,
        })
            .get('[type="checkbox"]')
            .check('2', {force: true})
            .url()
            .should('match', /2/)
            .wait(3000)
        cy.matchImageSnapshot('q2', {
            disableTimersAndAnimations: false,
        })
            .get('[type="checkbox"]')
            .check('2', {force: true})
            .url()
            .should('match', /3/)
            .wait(3000)
        cy.matchImageSnapshot('q3', {
            disableTimersAndAnimations: false,
        })
            .get('[type="checkbox"]')
            .check(['1', '3'], {force: true})
            .get('.btn-start')
            .click()
            .url()
            .should('match', /4/)
            .wait(3000)
        cy.matchImageSnapshot('q4', {
            disableTimersAndAnimations: true,
        })
            .get('[type="checkbox"]')
            .check(['1', '3'], {force: true})
            .get('.btn-start')
            .click()
            .url()
            .should('match', /5/)
            .wait(3000)
        cy.matchImageSnapshot('q5', {
            disableTimersAndAnimations: false,
        })
            .get('[type="checkbox"]')
            .check('4', {force: true})
            .url()
            .should('match', /6/)
        cy.matchImageSnapshot('q6', {
            disableTimersAndAnimations: false,
        })
            .wait(3000)
            .get('[type="checkbox"]')
            .check(['1', '3'], {force: true})
            .get('.btn-start')
            .click()
            .url()
            .should('match', /7/)
            .wait(3000)
        cy.matchImageSnapshot('q7', {
            disableTimersAndAnimations: false,
        })
            .get('[type="checkbox"]')
            .check(['1', '3', '6', '8', '9'], {force: true})
            .get('.btn-start')
            .click()
            .url()
            .should('match', /8/)
            .wait(3000)
        cy.matchImageSnapshot('q8', {
            disableTimersAndAnimations: false,
        })
            .get('[type="checkbox"]')
            .check(['2'], {force: true})
            .url()
            .should('match', /9/)
            .wait(3000)
        cy.matchImageSnapshot('q9', {
            disableTimersAndAnimations: false,
        })
            .get('[type="checkbox"]')
            .check('2', {force: true})
            .url()
            .should('match', /10/)
            .wait(3000)
        cy.matchImageSnapshot('q10', {
            disableTimersAndAnimations: false,
        })
            .get('[type="checkbox"]')
            .check(['1', '2', '3'], {force: true})
            .get('.btn-start')
            .click()
            .url()
            .should('match', /11/)
            .wait(3000)
        cy.matchImageSnapshot('q11', {
            disableTimersAndAnimations: false,
        })
            .getByText(/ランニング/i)
            .click()
            .wait(3000)
            .get('.modal > .answer--section > :nth-child(2) > .answer--answer')
            .click()
            .wait(3000)
            .get('.btn-start')
            .click()
            .url()
            .should('match', /12/)
            .wait(3000)
        cy.matchImageSnapshot('q12', {
            disableTimersAndAnimations: false,
        })
            .get('[type="checkbox"]')
            .check(['1', '2', '3'], {force: true})
            .get('.btn-start')
            .click()
            .url()
            .should('match', /13/)
            .wait(3000)
        cy.matchImageSnapshot('q13', {
            disableTimersAndAnimations: false,
        })
            .get('[type="checkbox"]')
            .check(['1', '2', '3'], {force: true})
            .get('.btn-start')
            .click()
            .url()
            .should('match', /14/)
            .wait(3000)
        cy.matchImageSnapshot('q14', {
            disableTimersAndAnimations: false,
        })
            .get('[type="checkbox"]')
            .check(['1', '2', '3'], {force: true})
            .get('.btn-start')
            .click()
            .url()
            .should('match', /15/)
            .wait(3000)
        cy.matchImageSnapshot('q15', {
            disableTimersAndAnimations: false,
        })
            .get('.input-container > .answer--input')
            .type('test user')
            .get('#test-select-year > .answer--input')
            .select('1985')
            .get('#test-select-month > .answer--input')
            .select('5')
            .getByText(/WOMAN/i)
            .click()
            .get('.btn-start')
            .click()
            .url()
            .should('eq', `${Cypress.config().baseUrl}/survey/summary`)
            .getByText(/これでマッチングする/i)
            .click()
            .url()
            .should('match', /results/)
            .wait(3000)
        cy.matchImageSnapshot('summary', {
            disableTimersAndAnimations: false,
        })
    })
})

describe('Get Results as anonomyus user', () => {
    const answers = {
        q1: ['1'],
        q2: ['1'],
        q3: ['1'],
        q4: ['1', '2'],
        q5: ['1'],
        q6: ['1', '2'],
        q7: ['1', '4', '7'],
        q8: ['0'],
        q9: ['1'],
        q10: ['1', '3', '5'],
        q11: [['0', '1']],
        q12: ['1', '3', '5'],
        q13: ['0', '3', '4'],
        q14: ['3', '2', '4'],
        q15: ['WOMAN', 'test', '1985', '5'],
    }

    beforeEach(() => {
        sessionStorage.setItem('surveyAnswers', JSON.stringify(answers))
    })

    it('get results as anonomyus user', () => {
        cy.visit('/')
            .getByText(/matching start/i)
            .click()
            .wait(1000)
            .url()
            .should('eq', `${Cypress.config().baseUrl}/survey/summary`)
            .getByText(/これでマッチングする/i)
            .click()
            .wait(10000)
            .url()
            .should('match', /results/)
        cy.matchImageSnapshot('results', {
            disableTimersAndAnimations: false,
        })
    })
})

describe('Try to order', () => {
    const answers = {
        q1: ['1'],
        q2: ['1'],
        q3: ['1'],
        q4: ['1', '2'],
        q5: ['1'],
        q6: ['1', '2'],
        q7: ['1', '4', '7'],
        q8: ['0'],
        q9: ['1'],
        q10: ['1', '3', '5'],
        q11: [['0', '1']],
        q12: ['1', '3', '5'],
        q13: ['0', '3', '4'],
        q14: ['3', '2', '4'],
        q15: ['WOMAN', 'test', '1985', '5'],
    }

    beforeEach(() => {
        sessionStorage.setItem('surveyAnswers', JSON.stringify(answers))
    })

    it('tries to order anonomyus user', () => {
        cy.visit('/')
            .getByText(/matching start/i)
            .click()
            .wait(1000)
            .url()
            .should('eq', `${Cypress.config().baseUrl}/survey/summary`)
            .getByText(/これでマッチングする/i)
            .click()
            .wait(10000)
            .url()
            .should('match', /results/)
            .get(
                ':nth-child(1) > :nth-child(1) > .results-product-buy-btn > .btn',
            )
            .click()
            .url()
            .should('eq', `${Cypress.config().baseUrl}/login?next=cart`)
    })
})
