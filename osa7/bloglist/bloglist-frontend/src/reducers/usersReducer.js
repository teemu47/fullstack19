import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data.users
    case 'RESET_USERS':
      return []
    default:
      return state
  }
}

export default usersReducer

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: { users }
    })
  }
}

export const resetUsers = () => {
  return dispatch => {
    dispatch({
      type: 'RESET_USERS'
    })
  }
}
