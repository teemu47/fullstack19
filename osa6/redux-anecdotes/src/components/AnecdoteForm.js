import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  
  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    store.dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
    
    const message = `you created '${content}'`
    store.dispatch(notificationChange(message))
    setTimeout(() => {
      store.dispatch(notificationReset())
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

export default AnecdoteForm