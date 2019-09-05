const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(x => x.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  })
  
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON)
  } catch (e) {
    next(e)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (e) {
    next(e)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const blog = {
    likes: request.body.likes
  }
  
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog.toJSON)
  } catch (e) {
    next(e)
  }
})

module.exports = blogRouter
