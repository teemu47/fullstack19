const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(x => x.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter
