import React, { useState } from 'react';
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setBlogs(await blogService.getAll())
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.error(e)
    }
    
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
          {user.name} logged in
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
