import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()
  const anecdoteStore = props.store

  const vote = (id) => {
    anecdoteStore.dispatch({
      type: 'VOTE',
      data: {id}
    })
  }
  
  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    anecdoteStore.dispatch({
      type: 'CREATE',
      data: {content}
    })
    event.target.anecdote.value = ''
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
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name={'anecdote'} /></div>
        <button type={'submit'}>create</button>
      </form>
    </div>
  )
}

export default App