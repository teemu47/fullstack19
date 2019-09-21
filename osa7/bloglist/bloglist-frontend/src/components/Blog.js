import React, { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [fullInfo, setFullInfo] = useState(false)

  const toggleFullInfo = () => {
    setFullInfo(!fullInfo)
  }

  const updateLikes = () => {
    addLike(blog.id)
  }
  
  const handleDelete = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
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
        <div>{blog.likes} likes <button style={pointerStyle} onClick={updateLikes}>like</button></div>
        <div>added by {blog.user.name}</div>
        <div><button style={deleteButton} onClick={handleDelete}>DELETE</button></div>
      </div>
    </div>
  )
}

export default Blog
