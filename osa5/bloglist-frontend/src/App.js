import './index.css'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`Logged in as ${user.username}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser('')
    setNotification(null) // 'clear "logged in as.." text'
    setErrorMessage(null) // clear possible error message
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const blogFormRef = useRef()

  const createBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create({
        title: title,
        author: author,
        url: url
      })
      setNotification(`new blog: ${title} by ${author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLikeToBlog = async (blog) => {
    try {
      await blogService.addLikeToDB(blog)
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogsList = () => (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLikeToBlog={addLikeToBlog}
          user={user}
        />
      )}
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create blog" ref={blogFormRef} buttonID="create-blog">
      <BlogForm
        createBlog={createBlog}
      />
    </Togglable>
  )

  const showNotification = () => {
    if (notification) {
      return (
        <div className="notification">
          {notification}
        </div>
      )
    }
    if (errorMessage){
      return (
        <div className="error">
          {errorMessage}
        </div>
      )
    }

    return null
  }

  return (
    <div>
      {!user && <h2>Login</h2>}
      {showNotification()}
      {!user &&
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      }
      {user && <h2>blogs</h2>}
      {user &&
        <div>
          <p>{user.name} logged in</p>
          <form onSubmit={handleLogout}>
            <button type="submit" id="logout-button">logout</button>
          </form>
        </div>
      }
      {user && blogForm()}
      {user && <div>{blogsList()}</div>}
    </div>
  )
}

export default App