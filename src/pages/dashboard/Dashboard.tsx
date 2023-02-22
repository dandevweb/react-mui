import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { ListingTools } from '../../shared/components/ListingTools'
import { BaseLayout } from '../../shared/layouts/BaseLayout'
import { CityService } from '../../shared/services/city/CityService'
import { PeopleService } from '../../shared/services/people/PeopleService'

export const Dashboard = () => {
  const [loadingCity, setLoadingCity] = useState(true)
  const [cityAmount, setCityAmount] = useState(0)
  const [loadingPeople, setLoadingPeople] = useState(true)
  const [peopleAmount, setPeopleAmount] = useState(0)


  useEffect(() => {
    setLoadingCity(true)
    setLoadingPeople(true)

    CityService.index(1)
      .then((result) => {
        setLoadingCity(false)

        if (result instanceof Error) {
          alert(result.message)
          return
        }
        setCityAmount(result.amount)
      })

    PeopleService.index(1)
      .then((result) => {
        setLoadingPeople(false)

        if (result instanceof Error) {
          alert(result.message)
          return
        }
        setPeopleAmount(result.amount)
      })

  }, [])
  return (
    <BaseLayout
      title='Página inicial'
      toolbar={<ListingTools showNewButton={false} />}>
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Pessoas
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!loadingPeople && (
                      <Typography variant='h1'>
                        {peopleAmount}
                      </Typography>
                    )}

                    {loadingPeople && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Cidades
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!loadingCity && (
                      <Typography variant='h1'>
                        {cityAmount}
                      </Typography>
                    )}

                    {loadingCity && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        </Grid>

      </Box>
    </BaseLayout >
  )
}