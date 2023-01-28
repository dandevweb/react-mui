import { Environment } from '../../environments'
import { Api } from '../api/axios-config'

export interface IPeopleList {
  id: number
  email: string
  cityId: number
  name: string
}

export interface IPeopleDetails {
  id: number
  email: string
  cityId: number
  name: string
}

type TPeopleAmount = {
  data: IPeopleList[]
  amount: number
}

const index = async (page = 1, filter = ''): Promise<TPeopleAmount | Error> => {
  try {
    const relativeUrl = `/people?_page=${page}&_limit=${Environment.LINE_LIMIT}&name_like=${filter}`

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

const show = async (id: number): Promise<IPeopleDetails | Error> => {
  try {

    const { data } = await Api.get(`/people/${id}`)

    if (data) {
      return data
    }

    return new Error('Registro não encontrado.')

  } catch (error) {
    console.log(error)
    return new Error((error as { message: string }).message || 'Erro ao tentar buscar o registro.')
  }
}

const store = async (request: Omit<IPeopleDetails, 'id'>): Promise<number | Error> => {
  try {

    const { data } = await Api.post<IPeopleDetails>('/people', request)

    if (data) {
      return data.id
    }

    return new Error('Ocorreu um erro ao tentar cadastrar.')

  } catch (error) {
    console.log(error)
    return new Error((error as { message: string }).message || 'Ocorreu um erro ao tentar cadastrar.')
  }
}

const update = async (id: number, request: IPeopleDetails): Promise<void | Error> => {
  try {
    await Api.put(`/people/${id}`, request)

  } catch (error) {
    console.log(error)
    return new Error((error as { message: string }).message || 'Houve um erro ao tentar atualizar.')
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {

    await Api.delete(`/people/${id}`)

  } catch (error) {
    console.log(error)
    return new Error((error as { message: string }).message || 'Erro ao tentar excluir.')
  }
}


export const PeopleService = {
  index,
  store,
  show,
  update,
  deleteById,
}