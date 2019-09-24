import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'

const Blog = props => {
  const { user, blog } = props
  const [fullInfo, setFullInfo] = useState(false)

  const toggleFullInfo = () => {
    setFullInfo(!fullInfo)
  }
  
  const deleteBlog = blogId => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      try {
        props.deleteBlog(blogId)
      } catch (e) {
        console.error(e)
      }
    }
  }
  
  const addLikeToBlog = async blogId => {
    const blogToUpdate = { ...props.blogs.find(b => b.id === blogId) }
    blogToUpdate.likes++
    props.updateBlog(blogToUpdate)
  }
  
  
  const deleteButton = {
    display: user.username === blog.user.username ? '' : 'none',
    color: 'red'
  }
  
  const showFullInfo = { display: fullInfo ? '': 'none' }
  
  const blogStyle = {
    border: 'solid',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'grey',
    padding: 7,
    marginBottom: 10,
    marginTop: 10
  }
  
  const pointerStyle = {
    cursor: 'pointer'
  }
  
  return (
    <div style={blogStyle} className={'blog'}>
      <div onClick={toggleFullInfo} style={pointerStyle}>
        {blog.title} {blog.author}
      </div>
      <div style={showFullInfo} className={'blogFullInfo'}>
        <div><a href={blog.url} target={'_blank'}>{blog.url}</a></div>
        <div>{blog.likes} likes <button style={pointerStyle} onClick={() => addLikeToBlog(blog.id)}>like</button></div>
        <div>added by {blog.user.name}</div>
        <div><button style={deleteButton} onClick={() => deleteBlog(blog.id)}>DELETE</button></div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  deleteBlog,
  updateBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
