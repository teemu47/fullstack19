import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App/>', () => {
  test('only shows login form when logged out', async () => {
    const component = render(
      <App />
    )
    await waitForElement(
      () => component.getByText('login')
    )
    expect(component.container).toHaveTextContent('Log in to application' && 'username' && 'password')
    expect(component.container).not.toHaveTextContent('Mock Blog')
  })
  
  test('renders blogs when user logged in', async () => {
    const mockUser = {
      username: 'testuser',
      token: 'testtoken',
      name: 'Test Da Man'
    }
    
    localStorage.setItem('loggedInUser', JSON.stringify(mockUser))
  
    const component = render(
      <App />
    )
    
    await waitForElement(
      () => component.getByText('blogs')
    )
    expect(component.container).toHaveTextContent('blogs')
    expect(component.container).toHaveTextContent(`${mockUser.name} logged in`)
    
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(2)
    
    expect(component.container).toHaveTextContent('Nice Blog' && 'Mock Blog' && 'added by Mock User')
  })
})