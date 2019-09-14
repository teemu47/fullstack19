import React from 'react';
import { voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = (props) => {
  const anecdotes = props.store.getState()
  const anecdoteStore = props.store

  const vote = (id) => {
    anecdoteStore.dispatch(voteAnecdote(id))
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
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
      <AnecdoteForm store={anecdoteStore}/>
    </div>
  )
}

export default App