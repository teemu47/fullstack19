import React from 'react'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  
  const simpleBlog = {
    title: 'Testing React',
    author: 'Rossi',
    url: 'http://www.testing-react.com',
    likes: 22
  }
  
  const mockFunction = () => {}
  
  const component = render(
    <SimpleBlog blog={simpleBlog} onClick={mockFunction}/>
    )
  
  // component.debug()
  const div = component.container.querySelector('div')
  console.log(prettyDOM(div))
  
  expect(component.container).toHaveTextContent(
    simpleBlog.title && simpleBlog.author && `blog has ${simpleBlog.likes} likes`
  )
  
})