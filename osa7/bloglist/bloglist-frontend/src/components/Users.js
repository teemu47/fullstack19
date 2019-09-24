import React from 'react'
import { connect } from 'react-redux'

const Users = props => {
  
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
        <tr>
          <th></th>
          <th>
            <strong>blogs created</strong>
          </th>
        </tr>
        </thead>
        <tbody>
        {props.users.map(user =>
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, null)(Users)