

describe('Test log out', () => {
    beforeEach('Login to the App', () => {
        cy.loginToApplication()
    })

    it('Verify User can Logout successfully',{retries: 2}, () => {
        cy.contains('Settings').click()
        cy.contains('Or click here to logout').click()
        cy.get('.navbar-nav').should('contain', 'Sign up')
    })
})