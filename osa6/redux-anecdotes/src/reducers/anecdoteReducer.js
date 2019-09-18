const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const newState = [...state]
      newState.find(n => n.id === action.data.id).votes += 1
      return newState.sort((a,b) => b.votes - a.votes)
    case 'ANECDOTE_CREATE':
      const content = action.data.content
      const anecdote = {
        content,
        id: getId(),
        votes: 0
      }
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

export const createAnecdote = (content) => {
  return {
    type: 'ANECDOTE_CREATE',
    data: {content}
  }
}

export const initializeAnecdotes = (anecdoteList) => {
  return {
    type: 'ANECDOTES_INIT',
    data: anecdoteList
  }
}