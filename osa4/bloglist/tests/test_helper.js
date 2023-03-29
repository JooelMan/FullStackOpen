const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "React",
    author: "Michael fantastico",
    url: "http://www.react.edu/book.html",
    likes: 9,
  },
  
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'will be removed soon', author: '', url: '', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}