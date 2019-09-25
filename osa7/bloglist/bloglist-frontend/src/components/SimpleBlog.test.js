import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  
  const simpleBlog = {
    title: 'Testing React',
    author: 'Rossi',
    url: 'http://www.testing-react.com',
    likes: 22
  }
  
  const mockHandler = jest.fn()
  
  
  test('renders content', () => {
    const component = render(
      <SimpleBlog blog={simpleBlog} onClick={mockHandler}/>
    )
    
    expect(component.container).toHaveTextContent(
      simpleBlog.title && simpleBlog.author && `blog has ${simpleBlog.likes} likes`
    )
  })
  
  test('calls event handler when pressing like twice', () => {
    const { getByText: component } = render(
      <SimpleBlog blog={simpleBlog} onClick={mockHandler}/>
    )
    
    const likeButton = component('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
  
  // component.debug()
  // const div = component.container.querySelector('div')
  // console.log(prettyDOM(div))
  
})
