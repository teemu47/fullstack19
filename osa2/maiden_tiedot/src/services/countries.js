import axios from 'axios'
const baseUrl = 'https://restcountries.eu/rest/v2/all'

const getAll = () => {
  const promise = axios.get(baseUrl)
  return promise.then(response => response.data)
}

export default {getAll}