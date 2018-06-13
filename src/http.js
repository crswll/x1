import axios from 'axios'
const timeout = 1000
const baseURL = process.env.NODE_ENV === 'production' ? 'https://crswll.github.io/x1/' : ''

const http = axios.create({
  timeout,
  baseURL,
})

export default http
