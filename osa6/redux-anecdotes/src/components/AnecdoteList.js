import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, notificationReset } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

const AnecdoteList = (props) => {
  const vote = async (id) => {
    const anecdoteToVote = props.anecdotes.find(a => a.id === id)
    props.voteAnecdote(anecdoteToVote)
    props.setNotification(`you voted '${anecdoteToVote.content}'`, 2)
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
            <div>
              has {anecdote.votes} votes
            </div>
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
  setNotification
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