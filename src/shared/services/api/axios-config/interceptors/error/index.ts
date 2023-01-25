import { AxiosError } from 'axios'

export function errorInterceptor(error: AxiosError) {

  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'))
  }

  if (error.response?.status === 401) {
    //
  }

  return Promise.reject(error)
}