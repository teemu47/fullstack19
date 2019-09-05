import React, { useState, useEffect } from 'react';
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  useEffect(() => {
    async function logIn() {
      const blogs = await blogService.getAll()
      const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON)
        blogService.setToken(user.token)
        setUser(user)
        setBlogs(blogs)
      }
    }
    
    logIn()
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setBlogs(await blogService.getAll())
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.error(e)
    }
  }
  
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }
  
  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type={'text'}
                   value={username}
                   name={'Username'}
                   onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input type={'password'}
                   value={password}
                   name={'Password'}
                   onChange={({target}) => setPassword(target.value)}
            />
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
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
        <br/>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
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
