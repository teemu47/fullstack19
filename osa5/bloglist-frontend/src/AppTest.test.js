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
})