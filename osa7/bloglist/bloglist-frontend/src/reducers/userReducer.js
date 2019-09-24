import loginService from '../services/login'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (user) => {
  return async dispatch => {
    const loggedInUser = await loginService.login(user)
    window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
    dispatch({
      type: 'SET_USER',
      data: { user: loggedInUser }
    })
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: { user }
    })
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer