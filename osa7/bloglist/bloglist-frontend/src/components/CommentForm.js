import React from 'react'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const CommentForm = props => {
  const [comment, resetComment] = useField('text')
  
  const addComment = async event => {
    event.preventDefault()
    await props.addComment(props.id, comment.value)
    resetComment()
  }
  
  return (
    <form onSubmit={addComment}>
      <input {...comment}/>
      <button>add comment</button>
    </form>
  )
}

const mapDispatchToProps = {
  addComment
}

export default connect(null, mapDispatchToProps)(CommentForm)
