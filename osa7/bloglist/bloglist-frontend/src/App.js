import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { createBlog, deleteBlog, initializeBlogs, updateBlog } from './reducers/blogReducer'

const App = (props) => {
  const [user, setUser] = useState(null)
  
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
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      props.initializeBlogs()
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.initializeBlogs()
      setUser(user)
      username.onChange(resetEvent)
      password.onChange(resetEvent)
    } catch (e) {
      props.setNotification('error: wrong username or password')
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
      props.createBlog(newBlog)
      props.setNotification(`a new blog ${newBlog.title} by ${newBlog.author}`)
      title.onChange(resetEvent)
      author.onChange(resetEvent)
      url.onChange(resetEvent)
    } catch (e) {
      props.setNotification('error: couldn\'t create a new blog')
      console.error(e)
    }
  }
  
  const addLikeToBlog = async blogId => {
    const blogToUpdate = { ...props.blogs.find(b => b.id === blogId) }
    blogToUpdate.likes++
    props.updateBlog(blogToUpdate)
  }
  
  const deleteBlog = async blogId => {
    try {
      props.deleteBlog(blogId)
    } catch (e) {
      console.error(e)
    }
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
        <Notification />
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
        <Notification />
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
        
        {blogForm()}
        
        <div>
          {props.blogs.map(blog =>
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

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  createBlog,
  deleteBlog,
  updateBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
