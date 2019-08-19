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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}