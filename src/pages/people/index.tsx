import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ListingTools } from '../../shared/components/ListingTools'
import { Environment } from '../../shared/environments'
import { useDebounce } from '../../shared/hooks/UseDebounce'
import { BaseLayout } from '../../shared/layouts/BaseLayout'
import { IPeopleList, PeopleService } from '../../shared/services/people/PeopleService'

export default function PeopleList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce()

  const [rows, setRows] = useState<IPeopleList[]>([])
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(true)

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  useEffect(() => {
    setLoading(true)

    debounce(() => {
      PeopleService.index(1, search)
        .then((result) => {
          setLoading(false)

          if (result instanceof Error) {
            alert(result.message)
            return
          }
          console.log(result)
          setRows(result.data)
          setAmount(result.amount)
        })
    })

  }, [search])

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

      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {amount === 0 && !loading && (
            <caption>{Environment.EMPTY_LIST}</caption>
          )}

          <TableFooter>
            <TableRow>

              {loading && (
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />

                </TableCell>
              )}
            </TableRow>

          </TableFooter>
        </Table>
      </TableContainer>

    </BaseLayout>
  )
} 