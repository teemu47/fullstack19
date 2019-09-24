import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'

const ViewBlog = props => {
  if (!props.blog) {
    return null
  }
  
  const addLike = () => {
    props.blog.likes++
    props.updateBlog(props.blog)
  }
  
  const deleteBlog = id => {
    if (window.confirm(`remove blog ${props.blog.title} by ${props.blog.author}`)) {
      props.deleteBlog(id)
    }
  }
  
  const deleteButton = {
    display: props.user.username === props.blog.user.username ? '' : 'none',
    color: 'red'
  }
  
  return (
    <div>
      <h2>{props.blog.title} {props.blog.author}</h2>
      <div>
        <a href={props.blog.url} target={'_blank'}>{props.blog.url}</a>
      </div>
      <div>
        {props.blog.likes} likes <button onClick={addLike}>like</button>
      </div>
      <div>
        added by {props.blog.user.name}
      </div>
      <div>
        <button style={deleteButton} onClick={() => deleteBlog(props.blog.id)}>DELETE</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(b => b.id === ownProps.id),
    user: state.user
  }
}

const mapDispatchToProps = {
  deleteBlog,
  updateBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBlog)