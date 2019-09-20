import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, notificationReset } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    props.createAnecdote(content)
    props.setNotification(`you created '${content}'`, 2)
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
  setNotification
}

const ConnectedAnecdoteList = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteList