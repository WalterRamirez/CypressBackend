

describe('Test log out', () => {
    beforeEach('Login to the App', () => {
        cy.loginToApplication()
    })

    it('Verify User can Logout successfully', () => {
        cy.contains('Settings').click()
        cy.contains('Or click here to logout').click()
        cy.get('.navbar-nav').should('contain', 'Sign up')
    })
})