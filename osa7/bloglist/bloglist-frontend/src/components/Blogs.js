import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const Blogs = props => {
  const blogFormRef = React.createRef()
  
  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      await props.createBlog(newBlog)
      props.setNotification(`a new blog ${newBlog.title} by ${newBlog.author}`)
      await props.initializeUsers()
    } catch (e) {
      props.setNotification('error: couldn\'t create a new blog')
      console.error(e)
    }
  }
  
  return (
    <div>
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div>
        {props.blogs.map(blog =>
          <Blog key={blog.id} id={blog.id} />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  createBlog,
  setNotification,
  initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)