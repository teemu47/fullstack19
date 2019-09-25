import React, { useEffect } from 'react'
import Notification from './components/Notification'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { login, setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import ViewBlog from './components/ViewBlog'
import NavigationMenu from './components/NavigationMenu'
import Blogs from './components/Blogs'
import { Button, Container, Form } from 'semantic-ui-react'
import styled from 'styled-components'

const App = (props) => {
  const [username, usernameReset] = useField('text')
  const [password, passwordReset] = useField('password')
  const { initializeBlogs, setUser } = props
  
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      initializeBlogs()
    }
  }, [initializeBlogs, setUser])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.login({ username: username.value, password: password.value })
      props.initializeBlogs()
      usernameReset()
      passwordReset()
    } catch (e) {
      props.setNotification('error: wrong username or password')
      console.error(e)
    }
  }
  
  const loginForm = () => {
    return (
      <Container>
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Field>
            <label>username</label>
            <input {...username} autoComplete={'username'}/>
          </Form.Field>
          <Form.Field>
            <label>password</label>
            <input {...password} autoComplete={'current-password'}/>
            </Form.Field>
            <Button type={'submit'}>login</Button>
        </Form>
      </Container>
    )
  }
  
  const Footer = styled.div`
    text-align: center;
    position: absolute;
    width: 100%
    bottom: 20px;
  `
  
  if (!props.user) {
    return loginForm()
  }
  
  return (
    <div>
      <Container>
        <Router>
          <NavigationMenu />
          <Notification />
          <Route exact path={'/'} render={() => <Blogs />} />
          <Route exact path={'/users'} render={() => <Users />} />
          <Route exact path={'/users/:id'} render={({ match }) => <User id={match.params.id}/>} />
          <Route exact path={'/blogs/:id'} render={({ match }) => <ViewBlog id={match.params.id} />} />
        </Router>
      </Container>
      <Footer>
        <p>All rigths not reserved 2019</p>
      </Footer>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  login,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
