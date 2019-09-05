const helper = require('./helper')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({username: 'root', password: 'secret'})
    await user.save()
  })
  
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'newName',
      name: 'Test Name',
      password: 'secret'
    }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  
  test('creation fails with existing username', async () => {
    const usersAtStart = await helper.usersInDb()
    const existingUsername = usersAtStart.map(u => u.username)[0]
    const newUser = {
      username: existingUsername,
      name: 'Test Name',
      password: 'secret'
    }
    
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error).toContain('expected `username` to be unique')
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
  
  test('creation fails with too short username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'ab',
      name: 'Test User',
      password: 'secret'
    }
    
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error).toContain('Too short username')
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
  
  test('creation fails with too short password', async () => {
    const usersAtStart = helper.usersInDb()
    const newUser = {
      username: 'testname',
      name: 'Test Name',
      password: 'ab'
    }
    
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error).toContain('Too short password')
    
    const usersAtEnd = helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})