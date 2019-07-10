import axios from 'axios'

const baseUrl = 'https://api.apixu.com/v1/current.json?key=923fd0ca949c4968af3164451191007&q='
const get = (countryName) => {
  const url = baseUrl + countryName
  const promise = axios.get(url)
  return promise.then(response => response.data)
}

export default {get}