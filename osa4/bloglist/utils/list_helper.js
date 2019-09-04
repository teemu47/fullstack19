const _ = require('lodash')
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum += blog.likes, 0)

const favouriteBlog = (blogs) => {
  const result = blogs.reduce((prev, next) => prev.likes > next.likes ? prev : next, {})
  return (({title, author, likes}) => ({title, author, likes})) (result)
}

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((list, blog) => {
    let author = list.find((entry) => entry.author === blog.author)
    if (!author) {
      author = { author: blog.author, blogs: 0 }
      list.push(author)
    }
    author.blogs++
    return list
  }, [])
  const authorWithMostBlogs = authors.reduce((prev, next) => prev.blogs > next.blogs ? prev : next, {})
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const authors = blogs.reduce((list, blog) => {
    let author = list.find((entry) => entry.author === blog.author)
    if (!author) {
      author = { author: blog.author, likes: 0 }
      list.push(author)
    }
    author.likes += blog.likes
    return list
  }, [])
  const authorWithMostLikes = authors.reduce((prev, next) => prev.likes > next.likes ? prev : next, {})
  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}