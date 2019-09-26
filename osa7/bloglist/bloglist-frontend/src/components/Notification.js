import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  const notification = props.notification
  if (notification === null) {
    return null
  }
  
  let variant = 'success'
  
  if (notification.includes('error')) {
    variant = 'danger'
  }
  
  return (
    <Alert data-test={'notification'} variant={variant}>
        {notification}
    </Alert>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)