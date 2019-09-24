import axios from 'axios'
const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: {
      Authorization: getToken()
    }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getToken = () => {
  const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
  if (loggedInUserJSON) {
    return `bearer ${JSON.parse(loggedInUserJSON).token}`
  }
  return null
}

const createBlog = async newBlog => {
  const config = getConfig()
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async updatedBlog => {
  const config = getConfig()
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const deleteBlog = async blogId => {
  const config = getConfig()
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response
}

const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment })
  return response.data
}

export default { getAll, createBlog, updateBlog, deleteBlog, addComment }