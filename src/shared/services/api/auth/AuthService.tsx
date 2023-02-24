import { Api } from '../axios-config'

interface IAuth {
  accessToken: string
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {

    const { data } = await Api.get('/auth', { data: { email, password } })

    if (data) {
      return data
    }

    return new Error('Ocorreu um erro ao tentar logar.')

  } catch (error) {
    console.log(error)
    return new Error((error as { message: string }).message || 'Ocorreu um erro ao tentar logar.')
  }
}

export const AuthService = {
  auth
}