import axios from 'axios'
const timeout = 1000

const http = axios.create({
  timeout,
})

export default http
