import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const [fullInfo, setFullInfo] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  
  const toggleFullInfo = () => {
    setFullInfo(!fullInfo)
  }
  
  const updateLikes = async () => {
    const updatedBlog = await addLike(blog.id)
    setLikes(updatedBlog.likes)
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
    <div style={blogStyle}>
      <div onClick={toggleFullInfo} style={pointerStyle}>
        {blog.title} {blog.author}
      </div>
      <div style={showFullInfo}>
        <div><a href={blog.url} target={'_blank'}>{blog.url}</a></div>
        <div>{likes} likes <button style={pointerStyle} onClick={updateLikes}>like</button></div>
        <div>added by {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog