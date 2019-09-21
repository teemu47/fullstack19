import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  
  if (notification === null) {
    return null
  }
  
  let notificationStyle = {
    fontSize: 20,
    color: 'green',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  if (notification.includes('error')) {
    notificationStyle.color = 'red'
  }
  
  return (
    <div style={notificationStyle}>
      {notification}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)