const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(x => x.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  })
  
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON)
  } catch (exception) {
    if (exception.name === 'ValidationError') {
      response.status(400).json({error: exception.message})
    }
  }
})

module.exports = blogRouter
