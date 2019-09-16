import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    event.target.anecdote.value = ''
    
    const message = `you created '${content}'`
    props.notificationChange(message)
    setTimeout(() => {
      props.notificationReset()
    }, 5000)
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name={'anecdote'} /></div>
        <button type={'submit'}>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  notificationReset,
  notificationChange
}

const ConnectedAnecdoteList = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteList