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
    id: 1,
    user: mockUser
  },
  {
    title: 'Nice Blog',
    author: 'Teemu Ijäs',
    url: 'www.testurl.com',
    likes: 12,
    id: 2,
    user: mockUser
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  // nothing needs to be done here when testing
}

export default { getAll, setToken }