import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { useField } from '@unform/core'
import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from '../../../../shared/hooks/UseDebounce'
import { CityService } from '../../../../shared/services/city/CityService'

type TAutoCompleteOption = {
  id: number
  label: string
}

interface ICityAutoCompleteProps {
  isExternalLoading?: boolean
}

export const CityAutoComplete = ({ isExternalLoading = false }: ICityAutoCompleteProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cityId')
  const { debounce } = useDebounce()
  const [options, setOptions] = useState<TAutoCompleteOption[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue)

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    })
  }, [registerField, fieldName, selectedId])

  useEffect(() => {
    setLoading(true)
    debounce(() => {
      CityService.index(1, search)
        .then((result) => {
          setLoading(false)

          if (result instanceof Error) {
            // alert(result.message)
            return
          }
          console.log(result.data)
          setOptions(result.data.map(city => ({ id: city.id, label: city.name })))
        })
    })
  }, [search])

  const autocompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null

    const selectedOption = options.find(option => option.id === selectedId)
    if (!selectedId) return null

    return selectedOption
  }, [selectedId, options])

  return (
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'
      disablePortal
      value={autocompleteSelectedOption}
      loading={loading}
      disabled={isExternalLoading}
      popupIcon={(isExternalLoading || loading) ? <CircularProgress size={28} /> : undefined}
      onInputChange={(_, newValue) => setSearch(newValue)}
      options={options}
      onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError() }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Cidade'
          error={!!error}
          helperText={error}
        />
      )}
    />
  )
}