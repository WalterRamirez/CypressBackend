describe('test with Backend', () => {

  beforeEach('Login to Application', () => {
    cy.loginToApplication()
  })

  it('passes', () => {
    cy.log('Logged In')
  })
})