
const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
    default:
      return state
  }
}

export default notificationReducer

export const notificationChange = message => {
  return {
   type: 'SET_NOTIFICATION',
    data: {message}
  }
}
