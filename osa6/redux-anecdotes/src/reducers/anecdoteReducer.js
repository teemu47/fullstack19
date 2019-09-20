import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE':
      const updatedState = [...state]
      updatedState.filter(a => a.id !== action.data.anecdote.id)
      updatedState.concat(action.data.anecdote)
      return updatedState.sort((a, b) => b.votes - a.votes)
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

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    anecdote.votes++
    await anecdoteService.update(anecdote)
    dispatch({
      type: 'UPDATE',
      data: {anecdote}
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'ANECDOTE_CREATE',
      data,
    })
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