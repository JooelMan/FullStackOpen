const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) { response.status(400).end(); return }
  if (!body.likes) { body.likes = 0 }
  
  const blog = new Blog(body)
  const result = await blog.save()
  
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  let body = request.body
  const oldBlog = await Blog.findById(request.params.id)
  if (!oldBlog) { response.status(400).end(); return }

  const blog = {
    title: body.title ? body.title : oldBlog.title,
    author: body.author ? body.author : oldBlog.author,
    url: body.url ? body.url : oldBlog.url,
    likes: body.likes ? body.likes : oldBlog.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
  response.json(updatedBlog)
})

module.exports = blogsRouter