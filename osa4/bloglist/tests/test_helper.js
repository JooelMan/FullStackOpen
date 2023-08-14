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
    author: "Michael Fantastico",
    url: "http://www.react.edu/book.html",
    likes: 9,
  },
]

const newBlog = {
  title: "Delphi 2",
  author: "Michael Fanta",
  url: "http://www.react.edu/book.html",
  likes: 3,
}

const blogWithoutLikes = {
  title: "NotLiked",
  author: "Nobody",
  url: "http://www.nobody.fi/book.html",
}

const blogWithoutTitle = {
  author: "NoTitleGuy",
  url: "http://www.nobody.fi/book.html",
  likes: 3,
}

const blogWithoutURL = {
  title: "NoURLDude",
  author: "Nobody",
  likes: 2
}

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
  initialBlogs, nonExistingId, blogsInDb, newBlog, blogWithoutLikes, blogWithoutTitle, blogWithoutURL
}