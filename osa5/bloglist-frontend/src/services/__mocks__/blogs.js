const mockUser = {
  name: 'Mock User',
  username: 'mock'
}

const blogs = [
  {
    title: 'Mock Blog',
    author: 'Test Man',
    url: 'www.testurl.com',
    likes: 10,
    user: mockUser
  },
  {
    title: 'Nice Blog',
    author: 'Teemu Ijäs',
    url: 'www.testurl.com',
    likes: 12,
    user: mockUser
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }