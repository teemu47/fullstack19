import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props
  const anecdotesToShow = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  const vote = (id) => {
    props.voteAnecdote(id)
    const votedAnecdote = anecdotes.find(a => a.id === id)
    
    const message = `you voted '${votedAnecdote.content}'`
    props.notificationChange(message)
  
    setTimeout(() => {
      props.notificationReset()
    }, 5000)
  }
  
  return (
    <div>
      <Filter />
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

const mapDispatchToProps = {
  voteAnecdote,
  notificationReset,
  notificationChange
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList