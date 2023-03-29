const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.length === 0
    ? 0
    : blogs.map(b => b.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  const likes = blogs.map(b => b.likes)
  const maxLikes = Math.max(...likes)
  const max = blogs.find(b => b.likes === maxLikes)

  return { title: max.title, author: max.author, likes: maxLikes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const grouped = lodash.groupBy(blogs, 'author') // -> { author1: [{'book1'}, {'book2'},...], author2: [...]}  
  const values = Object.values(grouped).map(v => v.length)
  const maxValue = Math.max(...values)
  const maxIndex = lodash.indexOf(values, maxValue)  
  const author = Object.keys(grouped)[maxIndex]

  return {
    author: author,
    blogs: maxValue
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}