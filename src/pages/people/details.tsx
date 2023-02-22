import { Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DetailTools } from '../../shared/components/DetailTools'
import { VForm, VTextField, useVForm } from '../../shared/forms'
import { BaseLayout } from '../../shared/layouts/BaseLayout'
import { PeopleService } from '../../shared/services/people/PeopleService'

interface IFormData {
  email: string
  cityId: number
  name: string
}

export function PeopleDetails() {
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()
  const { formRef, save, saveAndBack, isSaveAndBack } = useVForm()
  console.log(isSaveAndBack())

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    if (id !== 'nova') {
      setLoading(true)
      PeopleService.show(Number(id))
        .then((result) => {
          setLoading(false)
          if (result instanceof Error) {
            alert(result.message)
            navigate('/pessoas')
          } else {
            setName(result.name)
            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        email: '',
        cityId: '',
        name: '',
      })
    }
  }, [id])

  const handleSave = (data: IFormData) => {
    setLoading(true)
    if (id === 'nova') {
      PeopleService.store(data)
        .then((result) => {
          setLoading(false)
          if (result instanceof Error) {
            alert(result.message)
          } else {
            if (isSaveAndBack()) {
              navigate('/pessoas')
            } else {
              navigate(`/pessoas/detalhe/${result}`)
            }
          }
        })
    } else {
      PeopleService.update(Number(id), { id: Number(id), ...data })
        .then((result) => {
          setLoading(false)

          if (result instanceof Error) {
            alert(result.message)
          } else {
            if (isSaveAndBack()) {
              navigate('/pessoas')
            }
          }
        })
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar')) {
      PeopleService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('registro apagado com sucesso')
            navigate('/pessoas')
          }
        })
    }
  }

  return (
    <BaseLayout
      title={id === 'nova' ? 'Nova pessoa' : name}
      toolbar={
        <DetailTools
          newTextButton='Nova'
          showSaveBackButton
          showDeleteButton={id !== 'nova'}
          showNewButton={id !== 'nova'}

          onClickSave={save}
          onClickSaveBack={saveAndBack}
          onClickDelete={() => handleDelete(Number(id))}
          onClickBack={() => navigate('/pessoas')}
          onClickNew={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection='column' component={Paper} variant='outlined'>
          <Grid container direction='column' padding={2} spacing={2}>

            {loading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={5} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome Completo'
                  disabled={loading}
                  name='name'
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={5} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='E-mail'
                  disabled={loading}
                  name='email'
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={5} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Cidade'
                  disabled={loading}
                  name='cityId'
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>

      <h1>Detalhes {id}</h1>
    </BaseLayout>
  )
}