const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {url: 1, author: 1, title: 1})
  response.json(users.map(u => u.toJSON()))
})

userRouter.post('/', async(request, response, next) => {
  try {
    const body = request.body
    
    if (body.password.length < 3) {
      console.error('User validation failed: Too short password')
      return response.status(400).json({error: 'User validation failed: Too short password'})
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
      name: body.name,
      username: body.username,
      passwordHash: passwordHash
    })
  
    const newUser = await user.save()
    response.json(newUser.toJSON())
  } catch (e) {
    next(e)
  }
})


module.exports = userRouter
