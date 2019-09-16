import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState()
  const anecdotesToShow = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  
  const vote = (id) => {
    store.dispatch(voteAnecdote(id))
    const votedAnecdote = anecdotes.find(a => a.id === id)
    
    const message = `you voted '${votedAnecdote.content}'`
    store.dispatch(notificationChange(message))
  
    setTimeout(() => {
      store.dispatch(notificationReset())
    }, 5000)
  }
  
  return (
    <div>
      <Filter store={store} />
      {anecdotesToShow.map(anecdote =>
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