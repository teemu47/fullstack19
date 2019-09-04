const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(x => x.toJSON()))
  } catch (e) {
    console.error(e.message)
    response.status(500).end()
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
  } catch (e) {
    console.error('error message', e.message)
    if (e.name === 'ValidationError') {
      response.status(400).json({error: e.message})
    }
    response.status(500).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (e) {
    console.error('error message', e.message)
    response.status(500).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes
  }
  
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog.toJSON)
  } catch (e) {
    console.error('error message', e.message)
    response.status(500).end()
  }
})

module.exports = blogRouter
