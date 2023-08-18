describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'cytestuser',
      username: 'cytester',
      password: 'verysecret'
    }
    const otherUser = {
      name: 'testuser2',
      username: 'otheruser',
      password: 'verysecret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', otherUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('When logged in', function () {
    const title = 'cytitle'
    const author = 'epic author'
    beforeEach(function () {
      // login
      cy.get('#username').type('cytester')
      cy.get('#password').type('verysecret')
      cy.get('#login-button').click()

      // add blog
      cy.get('#create-blog').click()
      cy.get('#blogform-title').type(title)
      cy.get('#blogform-author').type(author)
      cy.get('#blogform-url').type('create.com')
      cy.get('#blogform-create').click()
    })

    it('A blog can be created', function () {
      // check that blog addition worked
      cy.contains(`${title} ${author}`)
    })

    it('A blog can be liked', function () {
      // make like-button visible
      cy.contains(`${title} ${author}`)
        .contains('view')
        .click()

      // add 1 like to blog
      cy.contains(`${title} ${author}`)
        .contains('like')
        .click()

      // check that blog has 1 like
      cy.contains(`${title} ${author}`)
        .contains('1')
    })

    it('A blog can be removed by the creator of the blog', function () {
      cy.contains(`${title} ${author}`)
        .contains('view')
        .click()

      cy.contains(`${title} ${author}`)
        .get('#remove-button')
        .click()

      cy.get(`${title} ${author}`).should('not.exist')
    })

    it('user other than the creator cannot see the remove button', function () {
      // logout
      cy.get('#logout-button').click()
      // login
      cy.get('#username').type('otheruser')
      cy.get('#password').type('verysecret')
      cy.get('#login-button').click()

      cy.contains(`${title} ${author}`)
        .contains('view')
        .click()

      cy.contains(`${title} ${author}`)
        .get('#remove-button').should('not.exist')
    })
  })

  describe('Blogs are ordered by the amount of likes', function () {
    it('', function () {
      const blog1 = {
        title: 'blog1',
        author: 'user1',
        url: 'blog1.com'
      }
      const blog2 = {
        title: 'blog2',
        author: 'user2',
        url: 'blog2.com'
      }
      const blog3 = {
        title: 'blog3',
        author: 'user3',
        url: 'blog3.com'
      }

      // login
      cy.get('#username').type('cytester')
      cy.get('#password').type('verysecret')
      cy.get('#login-button').click()

      // add blogs
      cy.get('#create-blog').click()
      cy.get('#blogform-title').type(blog1.title)
      cy.get('#blogform-author').type(blog1.author)
      cy.get('#blogform-url').type(blog1.url)
      cy.get('#blogform-create').click()

      cy.get('#create-blog').click()
      cy.get('#blogform-title').type(blog2.title)
      cy.get('#blogform-author').type(blog2.author)
      cy.get('#blogform-url').type(blog2.url)
      cy.get('#blogform-create').click()

      cy.get('#create-blog').click()
      cy.get('#blogform-title').type(blog3.title)
      cy.get('#blogform-author').type(blog3.author)
      cy.get('#blogform-url').type(blog3.url)
      cy.get('#blogform-create').click()

      // add likes
      cy.contains(`${blog1.title} ${blog1.author}`)
        .contains('view')
        .click()

      cy.contains(`${blog2.title} ${blog2.author}`)
        .contains('view')
        .click()

      cy.contains(`${blog3.title} ${blog3.author}`)
        .contains('view')
        .click()

      cy.contains(`${blog2.title} ${blog2.author}`)
        .contains('like')
        .click()

      cy.contains(`${blog2.title} ${blog2.author}`)
        .contains('like')
        .click()

      cy.contains(`${blog3.title} ${blog3.author}`)
        .contains('like')
        .click()

      // check order
      cy.get('.blog').eq(0).should('contain', `${blog2.title} ${blog2.author}`)
      cy.get('.blog').eq(1).should('contain', `${blog3.title} ${blog3.author}`)
      cy.get('.blog').eq(2).should('contain', `${blog1.title} ${blog1.author}`)
    })
  })

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('#username').type('cytester')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cytester')
      cy.get('#password').type('verysecret')
      cy.get('#login-button').click()
    })
  })
})