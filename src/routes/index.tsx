import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/dashboard/Dashboard'
import { useDrawerContext } from '../shared/contexts/DrawerContext'

export function AppRoutes() {
  const { setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página Inicial',
        icon: 'home',
        path: '/pagina-inicial'
      }
    ])
  }, [])

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}