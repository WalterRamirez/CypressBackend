describe('test with Backend', () => {
  
  beforeEach('Login to Application', () => {
    cy.loginToApplication()
  })

  it.only('Verify request & response', () => {

    // Start the intercept before to submit the info
    cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/').as('postArticles')

    // Submit the info from WebUI
    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type('Walter\'s Article Title')
    cy.get('[formcontrolname="description"]').type('Walter\'s Description')
    cy.get('[formcontrolname="body"]').type('My\nMultiline\nBody\n\n Bye!')
    cy.get('[placeholder="Enter tags"]').type('test, tags, backend, QA')
    cy.contains('Publish Article').click()

    // Wait for the response from the interceptor
    cy.wait('@postArticles').then(xhr => {

    console.log(xhr)
    expect(xhr.response.statusCode).to.equal(201)
    expect(xhr.response.body.article.body).to.equal("My\nMultiline\nBody\n\n Bye!")
    expect(xhr.response.body.article.description).to.equal("Walter's Description")

    // Deleting the Article in order to clean the Environment
    cy.get('.banner').contains('Delete Article').click()
    })
  })
})