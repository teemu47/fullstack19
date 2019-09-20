const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
    case 'RESET_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export default notificationReducer

export const setNotification = (message, lengthInSeconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
       data: {message}
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, lengthInSeconds * 1000)
  }
}

export const notificationReset = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}
