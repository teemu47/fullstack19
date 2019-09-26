import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavigationMenu = props => {
  const handleLogout = () => {
    props.logout()
  }
  
  return (
    <Menu pointing secondary>
      <Menu.Item><h3>blogger</h3></Menu.Item>
      <Menu.Item>
        <Link to={'/'}>blogs</Link>
      </Menu.Item>
      <Menu.Item>
        <Link data-test={'linkToUsers'} to={'/users'}>users</Link>
      </Menu.Item>
      <Menu.Menu position={'right'}>
        <Menu.Item>
          {props.user.name} logged in
        </Menu.Item>
        <Menu.Item
          name={'logout'}
          onClick={handleLogout}>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
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