import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

const User = props => {
  const { initializeUsers } = props
  
  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])
  
  if (!props.user) {
    return null
  }
  
  return (
    <div>
      <h2>{props.user.name}</h2>
      <h3>added blogs</h3>
      <List>
        {props.user.blogs.map(blog =>
          <List.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link></List.Item>
        )}
      </List>
      <ul>
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(u => u.id === ownProps.id)
  }
}

export default connect(mapStateToProps, { initializeUsers })(User)