import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CityList } from '../pages/city/Index'
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
      },
      {
        label: 'Cidades',
        icon: 'location_city',
        path: '/cidades'
      }
    ])
  }, [])

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/cidades" element={<CityList />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}