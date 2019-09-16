import React from 'react'

const Notification = ({ store }) => {
  const notification = store.getState().notification
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (!notification) {
    style.display = 'none'
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification