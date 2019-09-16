import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

const AnecdoteList = (props) => {
  const vote = (id) => {
    props.voteAnecdote(id)
    const votedAnecdote = props.anecdotes.find(a => a.id === id)
    props.notificationChange(`you voted '${votedAnecdote.content}'`)
    setTimeout(() => {
      props.notificationReset()
    }, 5000)
  }
  
  return (
    <div>
      <Filter />
      {props.anecdotesToShow.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    anecdotesToShow: anecdotesToShow(state)
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList