import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { withRouter } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'
import { Button, Card, Comment, Header } from 'semantic-ui-react'

const ViewBlogNoHistory = props => {
  if (!props.blog) {
    return null
  }
  
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
    display: props.user.username === props.blog.user.username ? '' : 'none'
  }
  
  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header>{props.blog.title}</Card.Header>
          <Card.Meta>{props.blog.author}</Card.Meta>
          <Card.Description><a href={props.blog.url}>{props.blog.url}</a></Card.Description>
          <Card.Description>{props.blog.likes} likes</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className={'ui two buttons'}>
            <Button color={'olive'} onClick={addLike}>like</Button>
            <Button color={'orange'} style={deleteButton} onClick={() => deleteBlog(props.blog.id)}>delete</Button>
          </div>
        </Card.Content>
      </Card>
      <Comment.Group divided={'true'} relaxed={'true'} size={'large'}>
        <Header as={'h3'} dividing>
          comments
        </Header>
        {props.blog.comments.map((comment, index) =>
          <Comment key={index}>
            {comment}
          </Comment>
        )}
      </Comment.Group>
      <CommentForm id={props.blog.id} />
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