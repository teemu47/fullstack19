import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getConfig = () => {
  return {
    headers: {
      Authorization: token
    }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
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

export default { getAll, setToken, createBlog, updateBlog }