import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { withRouter } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'

const ViewBlogNoHistory = props => {
  if (!props.blog) {
    return null
  }
  console.log('props.blog', props.blog)
  
  const addLike = () => {
    props.blog.likes++
    props.updateBlog(props.blog)
    props.setNotification(`you liked ${props.blog.title} by ${props.blog.author}`)
  }
  
  const deleteBlog = async (id) => {
    if (window.confirm(`remove blog ${props.blog.title} by ${props.blog.author}`)) {
      try {
        await props.deleteBlog(id)
        props.setNotification(`succesfully removed ${props.blog.title} by ${props.blog.author}`)
        props.history.push('/')
      } catch (e) {
        props.setNotification('error: couldn\'t remove blog')
      }
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
      <div>
        <h3>comments</h3>
        <ul>
          {props.blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
        </ul>
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
  updateBlog,
  setNotification
}

const ViewBlog = withRouter(ViewBlogNoHistory)

export default connect(mapStateToProps, mapDispatchToProps)(ViewBlog)