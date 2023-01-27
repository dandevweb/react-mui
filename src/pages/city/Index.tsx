import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ListingTools } from '../../shared/components/ListingTools'
import { BaseLayout } from '../../shared/layouts/BaseLayout'

export const CityList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  return (
    <BaseLayout
      title="Listagem de cidades"
      toolbar={
        <ListingTools
          showInputSearch
          searchText={search}
          newTextButton="Nova"
          onChangeSearchText={text => setSearchParams({ search: text }, { replace: true })}
        />
      }
    >

    </BaseLayout>
  )
} 