import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { useRouter } from 'next/router'

type AuthContextType = {
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['adminAccessToken'])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (cookies.adminAccessToken) {
      const authString = cookies.adminAccessToken.split(' ')[1]

      if (authString) {
        try {
          const decoded = atob(authString)
          const [email, password] = decoded.split(':')

          if (email && password) {
            setIsAuthenticated(true)
          } else {
            setIsAuthenticated(false)
          }
        } catch (e) {
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
    } else {
      setIsAuthenticated(false)
    }
  }, [cookies])

  const login = (email: string, password: string) => {
    const authString = `Basic ${btoa(`${email}:${password}`)}`

    setCookie('adminAccessToken', authString, { maxAge: 7 * 24 * 60 * 60, path: '/' })
    setIsAuthenticated(true)
  }

  const logout = () => {
    removeCookie('adminAccessToken', { path: '/' })
    setIsAuthenticated(false)
    router.push('/auth/sign-in')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
