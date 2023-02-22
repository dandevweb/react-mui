import { Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DetailTools } from '../../shared/components/DetailTools'
import { VForm, VTextField, useVForm, IVFormIErrors } from '../../shared/forms'
import { BaseLayout } from '../../shared/layouts/BaseLayout'
import { CityService } from '../../shared/services/city/CityService'

interface IFormData {
  name: string
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
})

export function CityDetails() {
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()
  const { formRef, save, saveAndBack, isSaveAndBack } = useVForm()
  console.log(isSaveAndBack())

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    if (id !== 'nova') {
      setLoading(true)
      CityService.show(Number(id))
        .then((result) => {
          setLoading(false)
          if (result instanceof Error) {
            alert(result.message)
            navigate('/cidades')
          } else {
            setName(result.name)
            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        name: '',
      })
    }
  }, [id])

  const handleSave = (data: IFormData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        setLoading(true)
        if (id === 'nova') {
          CityService.store(validatedData)
            .then((result) => {
              setLoading(false)
              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (isSaveAndBack()) {
                  navigate('/cidades')
                } else {
                  navigate(`/cidades/detalhe/${result}`)
                }
              }
            })
        } else {
          CityService.update(Number(id), { id: Number(id), ...validatedData })
            .then((result) => {
              setLoading(false)

              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (isSaveAndBack()) {
                  navigate('/cidades')
                }
              }
            })
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormIErrors = {}

        errors.inner.forEach(error => {
          if (!error.path) return
          validationErrors[error.path] = error.message
        })
        formRef.current?.setErrors(validationErrors)
      })


  }

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar')) {
      CityService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('registro apagado com sucesso')
            navigate('/cidades')
          }
        })
    }
  }

  return (
    <BaseLayout
      title={id === 'nova' ? 'Nova cidade' : name}
      toolbar={
        <DetailTools
          newTextButton='Nova'
          showSaveBackButton
          showDeleteButton={id !== 'nova'}
          showNewButton={id !== 'nova'}

          onClickSave={save}
          onClickSaveBack={saveAndBack}
          onClickDelete={() => handleDelete(Number(id))}
          onClickBack={() => navigate('/cidades')}
          onClickNew={() => navigate('/cidades/detalhe/nova')}
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
                  label='Nome'
                  disabled={loading}
                  name='name'
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </BaseLayout>
  )
}