import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const mockUser = {
    name: 'Mock User',
    username: 'mock'
  }
  
  const mockBlog = {
    title: 'Mock Blog',
    author: 'Test Man',
    url: 'www.testurl.com',
    likes: 10,
    user: mockUser
  }
  
  let component
  
  beforeEach(() => {
    component = render(
      <Blog blog={mockBlog} user={mockUser} />
    )
  })
  
  test('initially renders title and author only', () => {
    expect(component.container).toHaveTextContent(mockUser.name && mockBlog.title)
    const additionalInfoContainer = component.container.querySelector('.blogFullInfo')
    expect(additionalInfoContainer).toHaveStyle('display: none')
  })
  
  test('renders full info when clicked', () => {
    const additionalInfoContainer = component.container.querySelector('.blogFullInfo')
    expect(additionalInfoContainer).toHaveStyle('display: none')
    
    const div = component.getByText(`${mockBlog.title} ${mockBlog.author}`)
    fireEvent.click(div)
    expect(additionalInfoContainer).not.toHaveStyle('display: none')
  })
  
})