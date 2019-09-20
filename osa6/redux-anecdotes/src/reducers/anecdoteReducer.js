import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const newState = [...state]
      newState.find(n => n.id === action.data.id).votes += 1
      return newState.sort((a,b) => b.votes - a.votes)
    case 'ANECDOTE_CREATE':
      const anecdote = action.data
      return [...state, anecdote]
    case 'ANECDOTES_INIT':
      const initAnecdotes = action.data
      return initAnecdotes.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

export default anecdoteReducer

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'ANECDOTE_CREATE',
    data,
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ANECDOTES_INIT',
      data: anecdotes
    })
  }
}