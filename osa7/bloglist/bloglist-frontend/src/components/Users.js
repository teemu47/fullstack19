import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
import { Table } from 'semantic-ui-react'

const Users = props => {
  const { initializeUsers } = props
  
  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])
  
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>user</Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {props.users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)