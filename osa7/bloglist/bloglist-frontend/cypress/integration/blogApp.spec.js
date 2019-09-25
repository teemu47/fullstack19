/* global cy */
describe('bloggers app ', function() {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })
  
  it('should ask for username and password at front page', function () {
    cy.contains('username')
    cy.contains('password')
  })
  
  it('user can login', function () {
    cy.get('[data-test=username]')
      .type('testuser')
    cy.get('[data-test=password]')
      .type('abc123')
    cy.get('[data-test=login]')
      .click()
    cy.contains('Test User logged in')
    cy.contains('blogs')
    cy.contains('users')
    cy.contains('new blog')
  })
  
  describe('when logged in', function () {
    beforeEach( function () {
      cy.get('[data-test=username]')
        .type('testuser')
      cy.get('[data-test=password]')
        .type('abc123')
      cy.get('[data-test=login]')
        .click()
    })
  
  })
})