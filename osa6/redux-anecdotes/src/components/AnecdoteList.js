import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes
  
  const vote = (id) => {
    store.dispatch(voteAnecdote(id))
    const votedAnecdote = anecdotes.find(a => a.id === id)
    
    const message = `you voted '${votedAnecdote.content}'`
    store.dispatch(notificationChange(message))
  
    setTimeout(() => {
      store.dispatch(notificationChange(''))
    }, 5000)
  }
  
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList