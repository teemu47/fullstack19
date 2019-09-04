const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(x => x.title)
  
  expect(titles).toContain('First class tests')
})

test('identification field of a blog is named as "id"', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  
  expect(blog.id).toBeDefined()
})

test('blog can be added', async () => {
  const newBlog = {
    title: 'A nice blog',
    author: 'Teemu',
    url: 'www.teemu.com/blog',
    likes: 100
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  const titles = response.body.map(x => x.title)
  
  expect(titles.length).toBe(initialBlogs.length + 1)
  expect(titles).toContain('A nice blog')
})

test('likes should be 0 when adding a blog wihtout likes', async () => {
  const newBlog = {
    title: 'A blog without likes',
    author: 'Teemu',
    url: 'www.teemu.com/blogWithoutLikes',
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  const blog = response.body.find(x => x.title === 'A blog without likes')
  
  expect(blog.likes).toBeDefined()
  expect(blog.likes).toBe(0)
})

test('api should respond with status code 400 if title and author are not defined', async () => {
  const blogWithoutTitle = {
    author: 'Teemu',
    url: 'www.teemu.com/blogWithoutLikes',
  }
  
  const blogWithoutAuthor = {
    title: 'Blog without a title',
    url: "www.teemu.com/blogWithoutAuthor"
  }
  
  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)
  
  await api
    .post('/api/blogs')
    .send(blogWithoutAuthor)
    .expect(400)
})

test('blog can be deleted', async () => {
  const response = await api.get('/api/blogs')
  const firstId = response.body.map(x => x.id)[0]
  
  await api
    .delete('/api/blogs/' + firstId)
    .expect(204)
  
  const newResponse = await api.get('/api/blogs')
  expect(newResponse.body.length).toBe(initialBlogs.length - 1)
})

test('blog can be modified', async () => {
  const blog = {
    likes: 99
  }
  const response = await api.get('/api/blogs')
  const firstId = response.body.map(x => x.id)[0]
  
  await api
    .put('/api/blogs/' + firstId)
    .send(blog)
    .expect(200)
  
  const updatedBlog = await Blog.findById(firstId)
  expect(updatedBlog.likes).toBe(99)
})

afterAll(() => {
  mongoose.connection.close()
})
