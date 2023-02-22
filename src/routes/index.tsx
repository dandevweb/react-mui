import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/dashboard/Dashboard'
import { useDrawerContext } from '../shared/contexts/DrawerContext'
import PeopleList from '../pages/people/index'
import { PeopleDetails } from '../pages/people/details'
import CityList from '../pages/cities'
import { CityDetails } from '../pages/cities/details'

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
      },
      {
        label: 'Pessoas',
        icon: 'people',
        path: '/pessoas'
      }
    ])
  }, [])

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<PeopleList />} />
      <Route path="/pessoas/detalhe/:id" element={<PeopleDetails />} />

      <Route path="/cidades" element={<CityList />} />
      <Route path="/cidades/detalhe/:id" element={<CityDetails />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}