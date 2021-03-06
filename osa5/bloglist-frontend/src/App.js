import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  
  const blogFormRef = React.createRef()
  
  const resetEvent = {
    target: {
      value: ''
    }
  }
  
  useEffect(() => {
    async function logIn() {
      const blogs = await blogService.getAll()
      const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON)
        blogService.setToken(user.token)
        setUser(user)
        blogs.sort((prev, next) => next.likes - prev.likes)
        setBlogs(blogs)
      }
    }
    logIn()
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setBlogs(await blogService.getAll())
      setUser(user)
      username.onChange(resetEvent)
      password.onChange(resetEvent)
    } catch (e) {
      showNotification('error: wrong username or password')
      console.error(e)
    }
  }
  
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }
  
  const createBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = { title: title.value, author: author.value, url: url.value }
      const savedBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(savedBlog))
      showNotification(`a new blog ${savedBlog.title} by ${savedBlog.author}`)
      title.onChange(resetEvent)
      author.onChange(resetEvent)
      url.onChange(resetEvent)
    } catch (e) {
      showNotification('error: couldn\'t create a new blog')
      console.error(e)
    }
  }
  
  const addLikeToBlog = async blogId => {
    let updatedBlog = blogs.find(b => b.id === blogId)
    updatedBlog.likes++
    return await blogService.updateBlog(updatedBlog)
  }
  
  const deleteBlog = async blogId => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter(b => b.id !== blogId))
    } catch (e) {
      console.error(e)
    }
  }
  
  const showNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }
  
  const blogForm = () => (
    <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
      <BlogForm title={title} author={author} url={url} handleSubmit={createBlog} />
    </Togglable>
  )
  
  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...username} />
          </div>
          <div>
            password
            <input {...password} />
          </div>
          <button type={'submit'}>login</button>
        </form>
      </div>
    )
  }
  
  const bloglist = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
        
        {blogForm()}
        
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user}
                  addLike={addLikeToBlog} deleteBlog={deleteBlog}/>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div>
      {user === null && loginForm()}
      {user !== null && bloglist()}
    </div>
  )
}

export default App
