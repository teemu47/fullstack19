import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blogs = props => {
  const blogFormRef = React.createRef()
  
  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      await props.createBlog(blog)
      props.setNotification(`a new blog ${blog.title} by ${blog.author}`)
    } catch (e) {
      props.setNotification('error: couldn\'t create a new blog')
      console.error(e)
    }
  }
  
  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Table striped>
        <tbody data-test={'blogList'}>
        {props.blogs.map(blog =>
        <tr key={blog.id}>
          <td>
            <Link data-test={'linkToBlog'} to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </td>
          <td>
            {blog.author}
          </td>
        </tr>
        )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)