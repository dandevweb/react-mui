import { LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DetailTools } from '../../shared/components/DetailTools'
import { BaseLayout } from '../../shared/layouts/BaseLayout'
import { PeopleService } from '../../shared/services/people/PeopleService'

export function PeopleDetails() {
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()

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
            console.log(result)
          }
        })
    }
  }, [id])

  const handleSave = () => {
    alert('Save')
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

          onClickSave={handleSave}
          onClickSaveBack={handleSave}
          onClickDelete={() => handleDelete(Number(id))}
          onClickBack={() => navigate('/pessoas')}
          onClickNew={() => navigate('pessoal/detalhe/nova')}
        />
      }
    >

      {loading && (
        <LinearProgress variant='indeterminate' />
      )}
      <h1>Detalhes {id}</h1>
    </BaseLayout>
  )
}