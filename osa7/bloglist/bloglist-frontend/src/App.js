import React, { useEffect } from 'react'
import Notification from './components/Notification'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { login, setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Users from './components/Users'
import { initializeUsers } from './reducers/usersReducer'
import User from './components/User'
import ViewBlog from './components/ViewBlog'
import NavigationMenu from './components/NavigationMenu'
import Blogs from './components/Blogs'

const App = (props) => {
  const [username, usernameReset] = useField('text')
  const [password, passwordReset] = useField('password')
  const { initializeBlogs, setUser, initializeUsers } = props
  
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      initializeBlogs()
      initializeUsers()
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
  
  
  if (!props.user) {
    return loginForm()
  }
  
  return (
    <div>
      <Router>
        <NavigationMenu />
        <h2>blogger boys</h2>
        <Notification />
        <Route exact path={'/'} render={() => <Blogs />} />
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
  initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
