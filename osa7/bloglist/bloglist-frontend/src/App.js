import React, { useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import Users from './components/Users'
import { initializeUsers } from './reducers/usersReducer'
import User from './components/User'
import ViewBlog from './components/ViewBlog'

const App = (props) => {
  const [username, usernameReset] = useField('text')
  const [password, passwordReset] = useField('password')
  const { initializeBlogs, setUser, initializeUsers } = props
  
  const blogFormRef = React.createRef()
  
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      initializeBlogs()
      initializeUsers()
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [initializeBlogs, setUser, initializeUsers])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.login({ username: username.value, password: password.value })
      props.initializeBlogs()
      props.initializeUsers()
      usernameReset()
      passwordReset()
    } catch (e) {
      props.setNotification('error: wrong username or password')
      console.error(e)
    }
  }
  
  const handleLogout = () => {
    props.logout()
  }
  
  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      await props.createBlog(newBlog)
      props.setNotification(`a new blog ${newBlog.title} by ${newBlog.author}`)
    } catch (e) {
      props.setNotification('error: couldn\'t create a new blog')
      console.error(e)
    }
  }
  
  const blogForm = () => (
    <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
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
            <input {...username} autoComplete={'username'}/>
          </div>
          <div>
            password
            <input {...password} autoComplete={'current-password'} />
          </div>
          <button type={'submit'}>login</button>
        </form>
      </div>
    )
  }
  
  const bloglist = () => {
    return (
      <div>
        {blogForm()}
        <div>
          {props.blogs.map(blog =>
            <Blog key={blog.id} id={blog.id} />
          )}
        </div>
      </div>
    )
  }
  
  if (!props.user) {
    return loginForm()
  }
  
  return (
    <div>
      <Router>
        <h2>blogs</h2>
        <Notification />
        <div>
          {props.user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
        <Route exact path={'/'} render={() => bloglist()} />
        <Route exact path={'/users'} render={() => <Users />} />
        <Route exact path={'/users/:id'} render={({ match }) => <User id={match.params.id}/>} />
        <Route exact path={'/blogs/:id'} render={({ match }) => <ViewBlog id={match.params.id} />} />
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  createBlog,
  login,
  setUser,
  logout,
  initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
