import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = props => {

  const blogStyle = {
    border: 'solid',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'grey',
    padding: 7,
    marginBottom: 10,
    marginTop: 10
  }
  
  return (
    <div style={blogStyle} className={'blog'}>
      <Link to={`/blogs/${props.blog.id}`}>{props.blog.title} {props.blog.author}</Link>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(b => b.id === ownProps.id)
  }
}

export default connect(mapStateToProps, null)(Blog)
