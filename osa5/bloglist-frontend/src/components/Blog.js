import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [fullInfo, setFullInfo] = useState(false)
  
  const toggleFullInfo = () => {
    setFullInfo(!fullInfo)
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
  
  const titleStyle = {
    cursor: 'pointer'
  }
  
  return (
    <div style={blogStyle}>
      <div onClick={toggleFullInfo} style={titleStyle}>
        {blog.title} {blog.author}
      </div>
      <div style={showFullInfo}>
        <div><a href={blog.url} target={'_blank'}>{blog.url}</a></div>
        <div>{blog.likes} likes <button>like</button></div>
        <div>added by {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog