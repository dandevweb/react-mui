import axios from 'axios'
import { Environment } from '../../../environments'
import { errorInterceptor } from './interceptors/error'
import { responseInterceptor } from './interceptors/response'

const Api = axios.create({
  baseURL: Environment.BASE_URL
})

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
)

export { Api }