describe('test with Backend', () => {
  
  beforeEach('Login to Application', () => {
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', {fixture: 'tags.json'})
    cy.loginToApplication()
  })

  it('Verify request & response', () => {

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

  it('Verify popular tags are displayed', () => {
    cy.get('.tag-list').should('contain', "Walter").and('contain',"Was").and('contain', 'Here')
  })

  it('Verify global feeds like count', () => {
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles/feed*', {"articles": [], "articlesCount": 0})
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles*', {fixture: 'articles.json'})

    cy.contains('Global Feed').click()
    cy.get('app-article-list button').then(heartList => {
      expect(heartList[0]).to.contain('1')
      expect(heartList[1]).to.contain('5')
    })

    cy.fixture('articles.json').then(articlesObj => {
      const articleLink = articlesObj.articles[1].slug
      articlesObj.articles[1].favoritesCount = 6
      cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/' + articleLink + '/favorite', articlesObj)
    })

    cy.get('app-article-list button').eq(1).click().should('contain', '6')
  })
})