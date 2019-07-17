import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const promise = axios.get(baseUrl)
  return promise.then(response => response.data)
}

const create = personObject => {
  const promise = axios.post(baseUrl, personObject)
  return promise.then(response => response.data)
}

const remove = id => {
  const promise = axios.delete(`${baseUrl}/${id}`)
  return promise.then(response => response)
}

const update = (id, newObject) => {
  const promise = axios.put(`${baseUrl}/${id}`, newObject)
  return promise.then(response => response.data)
}

export default {getAll,create,remove,update}