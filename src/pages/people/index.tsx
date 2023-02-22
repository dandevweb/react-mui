import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ListingTools } from '../../shared/components/ListingTools'
import { Environment } from '../../shared/environments'
import { useDebounce } from '../../shared/hooks/UseDebounce'
import { BaseLayout } from '../../shared/layouts/BaseLayout'
import { IPeopleList, PeopleService } from '../../shared/services/people/PeopleService'

export default function PeopleList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce()
  const navigate = useNavigate()

  const [rows, setRows] = useState<IPeopleList[]>([])
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(true)

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  const page = useMemo(() => {
    return Number(searchParams.get('page') || 1)
  }, [searchParams])

  useEffect(() => {
    setLoading(true)

    debounce(() => {
      PeopleService.index(page, search)
        .then((result) => {
          setLoading(false)

          if (result instanceof Error) {
            alert(result.message)
            return
          }
          setRows(result.data)
          setAmount(result.amount)
        })
    })

  }, [search, page])

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar')) {
      PeopleService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id)
            ]
            )
            alert('registro apagado com sucesso')
          }
        })
    }
  }

  return (
    <BaseLayout
      title="Listagem de cidades"
      toolbar={
        <ListingTools
          showInputSearch
          searchText={search}
          newTextButton="Nova"
          onClickNew={() => navigate('/pessoas/detalhe/nova')}
          onChangeSearchText={text => setSearchParams({ search: text, page: '1' }, { replace: true })}
        />
      }
    >

      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size='small' onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {amount === 0 && !loading && (
            <caption>{Environment.EMPTY_LIST}</caption>
          )}

          <TableFooter>

            {loading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />

                </TableCell>
              </TableRow>
            )}

            {(amount > 0 && amount > Environment.LINE_LIMIT) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(amount / Environment.LINE_LIMIT)}
                    onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}

          </TableFooter>
        </Table>
      </TableContainer>

    </BaseLayout>
  )
} 