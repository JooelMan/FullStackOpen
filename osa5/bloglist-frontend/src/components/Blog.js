import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, addLikeToBlog, user }) => {
  const [viewExtended, setViewExtended] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => {
    await addLikeToBlog(blog)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog: ${blog.title}?`)) {
      await blogService.removeBlogFromDB(blog)
    }
  }

  const removeButton = () => {
    if (user.username === blog.user.username) {
      return (
        <button onClick={() => removeBlog()}>remove</button>
      )
    } else {
      return null
    }
  }

  const extendedInfo = () => {
    return (
      <div>
        <div>{blog.url}</div>
        <div>{blog.likes}
          <button onClick={() => addLike()}>like</button>
        </div>
        <div>{blog.author}</div>
        {removeButton()}
      </div>
    )}

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setViewExtended(!viewExtended)}>
        {!viewExtended && 'view'}
        {viewExtended && 'hide'}
      </button>
      {viewExtended && extendedInfo()}
    </div>
  )
}

export default Blog