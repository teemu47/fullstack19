import React from 'react'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'

const CommentForm = props => {
  const [comment, resetComment] = useField('text')
  
  const addComment = async event => {
    event.preventDefault()
    await props.addComment(props.id, comment.value)
    resetComment()
  }
  
  return (
    <Form onSubmit={addComment}>
      <Form.Field>
        <input data-test={'commentInput'} {...comment}/>
      </Form.Field>
      <Button data-test={'commentSubmit'} color={'blue'}>add comment</Button>
    </Form>
  )
}

const mapDispatchToProps = {
  addComment
}

export default connect(null, mapDispatchToProps)(CommentForm)
