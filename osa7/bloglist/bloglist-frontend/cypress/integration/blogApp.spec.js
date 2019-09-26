/* global cy */
const testDatabase = 'http://localhost:3003'
const testUser = {
  name: 'Test Dude',
  username: 'testing',
  password: 'testpass47'
}

describe('bloggers app', function() {
  beforeEach(function () {
    cy.request('POST', `${testDatabase}/api/test/reset`)
    cy.request('POST', `${testDatabase}/api/users`, testUser)
    cy.visit('')
  })
  
  it('should ask for username and password at front page', function () {
    cy.contains('username')
    cy.contains('password')
  })
  
  describe('when logged in', function () {
    beforeEach( function () {
      cy.get('[data-test=username]')
        .type(testUser.username)
      cy.get('[data-test=password]')
        .type(testUser.password)
      cy.get('[data-test=login]')
        .click()
    })
    
    it('should display home screen', function () {
      cy.contains(`${testUser.name} logged in`)
      cy.contains('blogs')
      cy.contains('users')
      cy.contains('new blog')
    })
    
    describe.only('when blog has been created', function () {
      const testBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://www.testingbloggers.com'
      }
      beforeEach(function () {
        cy.get('[data-test=toggleCreateBlogForm]')
          .click()
        cy.get('[data-test=title]')
          .type(testBlog.title)
        cy.get('[data-test=author]')
          .type(testBlog.author)
        cy.get('[data-test=url]')
          .type(testBlog.url)
        cy.get('[data-test=create]')
          .click()
      })
      
      it('should show notification and be added to list of blogs', function () {
        cy.contains(`a new blog ${testBlog.title} by ${testBlog.author}`)
        cy.get('[data-test=blogList]').should('have.length', 1)
      })
      
      describe('when browsed to blog page', function () {
        beforeEach(function () {
          cy.get('[data-test=linkToBlog]').click()
        })
  
        it('should add a like', function () {
          cy.get('[data-test=blogLikes]').contains('0 likes')
          cy.get('[data-test=likeButton]').click()
          cy.get('[data-test=blogLikes]').contains('1 likes')
        })
        
        it('should add comments', function () {
          const comment = 'What a nice blog!'
          cy.get('[data-test=commentList]').should('have.length', 0)
          cy.get('[data-test=commentInput]').type(comment)
          cy.get('[data-test=commentSubmit]').click()
          cy.get('[data-test=commentList]').contains(comment)
          cy.get('[data-test=commentList]').should('have.length', 1)
          
          cy.get('[data-test=commentInput]').type(comment)
          cy.get('[data-test=commentSubmit]').click()
          cy.get('[data-test=commentList]').should('have.length', 2)
        })
        
        it('should delete blog', function () {
          cy.get('[data-test=deleteButton]').click()
          cy.get('[data-test=notification]').contains(`successfully removed ${testBlog.title} by ${testBlog.author}`)
        })
      })
    })
    
    describe('when browsing to users page', function () {
      beforeEach(function () {
        cy.get('[data-test=linkToUsers]').click()
      })
      
      it('should display list of users', function () {
        cy.get('[data-test=listOfUsers]').should('have.length', 1)
        cy.get('[data-test=listOfUsers]').contains(testUser.name)
      })
    })
  })
})