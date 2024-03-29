import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { AuthService } from '../services/api/auth/AuthService'

interface IAuthContextData {
  isAuthenticated: boolean
  logout: () => void
  login: (email: string, password: string) => Promise<string | void>
}

const AuthContext = createContext({} as IAuthContextData)

const LOCAL_STORAGE_ACCESS_TOKEN = 'APP_ACCESS_TOKEN'

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string>()

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken))
    } else {
      setAccessToken(undefined)
    }
  }, [])

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password)
    if (result instanceof Error) {
      return result.message
    } else {
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, JSON.stringify(result.accessToken))

      localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN)
      setAccessToken(result.accessToken)
    }

  }, [])

  const handleLogout = useCallback(() => {
    setAccessToken(undefined)
  }, [])

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}