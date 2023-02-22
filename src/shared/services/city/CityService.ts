import { Environment } from '../../environments'
import { Api } from '../api/axios-config'

export interface ICityList {
  id: number
  name: string
}

export interface ICityDetails {
  id: number
  name: string
}

type TCityAmount = {
  data: ICityList[]
  amount: number
}

const index = async (page = 1, filter = ''): Promise<TCityAmount | Error> => {
  try {
    const relativeUrl = `/cities?_page=${page}&_limit=${Environment.LINE_LIMIT}&name_like=${filter}`

    const { data, headers } = await Api.get(relativeUrl)

    if (data) {
      return {
        data,
        amount: Number(headers['x-total-count'] || Environment.LINE_LIMIT),
      }
    }

    return new Error('Erro ao tentar listar os registros.')

  } catch (error) {
    console.log(error)
    return new Error((error as { message: string }).message || 'Erro ao tentar listar os registros.')
  }
}

const show = async (id: number): Promise<ICityDetails | Error> => {
  try {

    const { data } = await Api.get(`/cities/${id}`)

    if (data) {
      return data
    }

    return new Error('Registro não encontrado.')

  } catch (error) {
    console.log(error)
    return new Error((error as { message: string }).message || 'Erro ao tentar buscar o registro.')
  }
}

const store = async (request: Omit<ICityDetails, 'id'>): Promise<number | Error> => {
  try {

    const { data } = await Api.post<ICityDetails>('/cities', request)

    if (data) {
      return data.id
    }

    return new Error('Ocorreu um erro ao tentar cadastrar.')

  } catch (error) {
    console.log(error)
    return new Error((error as { message: string }).message || 'Ocorreu um erro ao tentar cadastrar.')
  }
}

const update = async (id: number, request: ICityDetails): Promise<void | Error> => {
  try {
    await Api.put(`/cities/${id}`, request)

  } catch (error) {
    console.log(error)
    return new Error((error as { message: string }).message || 'Houve um erro ao tentar atualizar.')
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {

    await Api.delete(`/cities/${id}`)

  } catch (error) {
    console.log(error)
    return new Error((error as { message: string }).message || 'Erro ao tentar excluir.')
  }
}


export const CityService = {
  index,
  store,
  show,
  update,
  deleteById,
}