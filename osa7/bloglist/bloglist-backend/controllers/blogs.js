const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const decodeToken = (request) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return undefined
  }
  return decodedToken;
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(x => x.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = decodeToken(request)
    if (!decodedToken) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {username: 1, name: 1})
    response.status(201).json(populatedBlog.toJSON())
  } catch (e) {
    next(e)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  const blogId = request.params.id
  try {
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return response.status(204).end()
    }
    
    const decodedToken = decodeToken(request)
    if (!decodedToken) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    
    const user = await User.findById(decodedToken.id)
    
    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(blogId)
    } else {
      return response.status(401).json({error: 'unauthorized user'})
    }
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
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true}).populate('user', {username: 1, name: 1})
    response.json(updatedBlog.toJSON())
  } catch (e) {
    next(e)
  }
})

blogRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    blog.comments = blog.comments.concat(request.body.comment)
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true}).populate('user', {username: 1, name: 1})
    response.json(updatedBlog.toJSON())
  } catch (e) {
    next(e)
  }
})

module.exports = blogRouter
