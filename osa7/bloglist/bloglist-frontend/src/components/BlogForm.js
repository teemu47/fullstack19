import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { Button, Form } from 'semantic-ui-react'

const BlogForm = ({ createBlog }) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')
  
  const handleSubmit = event => {
    event.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    titleReset()
    authorReset()
    urlReset()
  }
  
  return (
    <div>
      <h3>Create a new blog</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>title</label>
          <input data-test={'title'} {...title}/>
        </Form.Field>
        
        <Form.Field>
          <label>author</label>
          <input data-test={'author'} {...author}/>
        </Form.Field>
        
        <Form.Field>
          <label>url</label>
          <input data-test={'url'} {...url}/>
        </Form.Field>
  
        <Button data-test={'create'} color={'olive'} type={'submit'}>create</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm