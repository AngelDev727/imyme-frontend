import questionDictionary from '../../../shared/questionDictionary'

function answerText(index, survey) {
    return questionDictionary[`q${index}`].question.replace(
        '\t',
        `${formatAnswer(index, survey[`q${index}`])}`,
    )
}

function formatAnswer(index, answer) {
    if (!answer) return
    if (!index) return

    let formattedAnswer = ''

    if (index === 11) {
        answer.forEach(a => {
            formattedAnswer +=
                questionDictionary[`q${index}`].answers[a[0]] + '、'
            if (questionDictionary[`q${index}`].subAnswers[a[1]]) {
                formattedAnswer +=
                    questionDictionary[`q${index}`].subAnswers[a[1]] + '、'
            }
        })
    } else {
        answer.forEach(a => {
            formattedAnswer += questionDictionary[`q${index}`].answers[a] + '、'
        })
    }

    return formattedAnswer.substring(0, formattedAnswer.length - 1)
}

describe('Get Results as logged in user', () => {
    beforeEach(() => {
        sessionStorage.clear()
    })

    // it('should have correct results', () => {
    //     cy.signIn({
    //         email: 'testuser@imyme.com',
    //         password: '123456',
    //     }).then(() => {
    //         cy.visit('/mypage')
    //             .get(':nth-child(5) > .bg-body > #questionare-icon')
    //             .click()
    //         cy.getUserAnswers().then(({body}) => {
    //             cy.get('.answer-summary--ans').each(($el, index, $list) => {
    //                 expect(`${answerText(index + 1, body.selection)}`).to.equal(
    //                     $el.context.innerText,
    //                 )
    //             })
    //         })
    //     })
    // })

    // it('should update results', () => {
    //     cy.signIn({
    //         email: 'testuser@imyme.com',
    //         password: '123456',
    //     }).then(() => {
    //         cy.visit('/')
    //             .get('[data-testid=matching-start-button] > :nth-child(1)')
    //             .click()
    //             .url()
    //             .should('eq', `${Cypress.config().baseUrl}/survey/summary`)
    //             .wait(2000)
    //             .get(
    //                 '[style="transition-delay: 0ms; animation-delay: 300ms;"] > .answer-summary--item > .answer-summary--ans',
    //             )
    //             .click()
    //             .wait(2000)
    //             .url()
    //             .should('eq', `${Cypress.config().baseUrl}/survey/1`)
    //             .get('[type="checkbox"]')
    //             .uncheck('0', {force: true})
    //             .get('[type="checkbox"]')
    //             .uncheck('1', {force: true})
    //             .get('[type="checkbox"]')
    //             .uncheck('2', {force: true})
    //             .wait(2000)
    //             .get('[type="checkbox"]')
    //             .check(`${Math.floor(Math.random() * (2 - 0 + 1)) + 0}`, {
    //                 force: true,
    //             })
    //             .wait(1000)
    //             .url()
    //             .should('eq', `${Cypress.config().baseUrl}/survey/summary`)
    //             .getByText(/これでマッチングする/i)
    //             .click()
    //             .url()
    //             .should('match', /results/)
    //             .wait(3000)
    //         cy.getUserAnswers().then(({body}) => {
    //             cy.get('.answer-summary--ans').each(($el, index, $list) => {
    //                 expect(`${answerText(index + 1, body.selection)}`).to.equal(
    //                     $el.context.innerText,
    //                 )
    //             })
    //         })
    //     })
    // })
})

describe('Edit default address', () => {
    it('should update default address', () => {
        cy.signIn({
            email: 'testuser@imyme.com',
            password: '123456',
        }).then(() => {
            cy.deleteAllAddresses().then(() => {
                cy.addDefaultAddress().then(() => {
                    cy.visit('/mypage')
                        .get(':nth-child(3) > .value')
                        .should('contain', '0100003')
                        .getByText(/編集/i)
                        .click()
                        .wait(1000)
                        .url()
                        .should(
                            'eq',
                            `${Cypress.config().baseUrl}/edit-details`,
                        )
                        .get('[id="zip"]')
                        .clear()
                        .type('0040001')
                        .get('[id="building"]')
                        .clear()
                        .type('Test house hokkaido')
                        .getByText(/次へ進む/i)
                        .click()
                        .wait(1000)
                        .url()
                        .should('eq', `${Cypress.config().baseUrl}/mypage`)
                        .get(':nth-child(3) > .value')
                        .should('contain', '0040001')
                })
            })
        })
    })
})
