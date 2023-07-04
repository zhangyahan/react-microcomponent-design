import axios from 'axios'

export const request = axios.create({
  baseURL: '',
  timeout: 6000,
})

request.interceptors.request.use(config => config)
request.interceptors.response.use(response => response)
