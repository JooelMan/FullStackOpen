const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('GET /api/blogs', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('first blog is returned', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain('Canonical string reduction')
  })

  test('all blog ids are defined', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.id)

    titles.forEach(title => {
      expect(title).toBeDefined
    })
  })

})

describe('POST /api/blogs', () => {

  test('number of blogs increases with 1', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    //console.log(blogsAtEnd);
    
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  })

  test('new blog is returned', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Delphi 2')
  })

  test('number of likes is 0 by default when not specifying it', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithoutLikes)

    const blogsAtEnd = await helper.blogsInDb() 
    const newBlog = blogsAtEnd.filter(b => b.title === 'NotLiked')
    
    expect(newBlog[0].likes).toBe(0)
  })

  test('request without title invokes response status 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithoutTitle)
      .expect(400)
  })

  test('request without url invokes response status 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithoutURL)
      .expect(400)
  })

})

describe('DELETE /api/blogs/:id', () => {
  
  test('valid id removes valid object', async () => {
    const blogs = await helper.blogsInDb()
    const id = blogs[0].id
    
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogs.length - 1)

    const titles = blogsAtEnd.map(b => b.titles)

    expect(titles).not.toContain(blogs[0].title)
  })

})

describe('PUT /api/blogs/:id', () => {
  
  test('valid id updates valid object', async () => {
    const blogs = await helper.blogsInDb()
    const blogToBeUpdated = blogs[0]
    
    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send({
        likes: blogToBeUpdated.likes + 2
      })

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].likes).toBe(blogToBeUpdated.likes + 2)
  })

  test('non valid id fails with status code 400', async () => {
    await api
      .put(`/api/blogs/${helper.initialBlogs[0].id}431`)
      .send({
        likes: helper.initialBlogs[0].likes + 2
      })
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(helper.initialBlogs[0].likes)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})