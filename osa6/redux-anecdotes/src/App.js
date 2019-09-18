import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = (props) => {
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => props.initializeAnecdotes(anecdotes))
  }, [])
  
  return (
    <div>
      <h1>programming anecdotes</h1>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)