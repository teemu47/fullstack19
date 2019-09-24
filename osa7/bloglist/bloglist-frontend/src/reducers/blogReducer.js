import blogService from '../services/blogs'

const byLikes = (a, b) => {
  return b.likes - a.likes
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.blogs.sort(byLikes)
    case 'CREATE_BLOG':
      return [...state, action.data.blog]
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    case 'UPDATE_BLOG':
      return state.map(b => b.id === action.data.blog.id ? action.data.blog : b).sort(byLikes)
    default:
      return state
    
  }
}

export default blogReducer

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: { blogs }
    })
  }
}

export const createBlog = newBlog => {
  return async dispatch => {
    const blog = await blogService.createBlog(newBlog)
    await dispatch({
      type: 'CREATE_BLOG',
      data: { blog }
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export const updateBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.updateBlog(newBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: { blog }
    })
  }
}