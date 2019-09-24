import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const NavigationMenu = props => {
  const handleLogout = () => {
    props.logout()
  }
  
  const menuStyle = {
    backgroundColor: 'lightgray',
    padding: 8
  }
  const linkStyle = {
    margin: 5
  }
  
  return (
    <div style={menuStyle}>
      <Link to={'/'} style={linkStyle}>blogs</Link>
      <Link to={'/users'} style={linkStyle}>users</Link>
      {props.user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu)