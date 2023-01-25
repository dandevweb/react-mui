import axios from 'axios'
import { errorInterceptor } from './interceptors/error'
import { responseInterceptor } from './interceptors/response'

const Api = axios.create({
  baseURL: 'http://localhost:3333'
})

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
)

export { Api }