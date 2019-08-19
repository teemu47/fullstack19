const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum += blog.likes, 0)

const favouriteBlog = (blogs) => {
  const favouriteBlog = blogs.reduce((favourite, blog) => {
    if ((Object.keys(favourite).length === 0 && favourite.constructor === Object) || blog.likes > favourite.likes) {
      favourite.title = blog.title
      favourite.author = blog.author
      favourite.likes = blog.likes
    }
    return favourite
  }, {})
  return favouriteBlog
}

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((list, blog) => {
    let author = list.find((entry) => entry.author === blog.author)
    if (!author) {
      author = {
        author: blog.author,
        blogs: 0
      }
      list.push(author)
    }
    author.blogs += 1
    return list
  }, [])
  
  const authorWithMostBlogs = authors.reduce((mostBlogs, author) => {
    if ((Object.keys(mostBlogs).length === 0 && mostBlogs.constructor === Object) || author.blogs > mostBlogs.blogs) {
      mostBlogs = author
    }
    return mostBlogs
  }, {})
  
  return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}