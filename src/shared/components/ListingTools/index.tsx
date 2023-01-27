import { Box, Button, TextField, Paper, useTheme, Icon } from '@mui/material'

import { Environment } from '../../environments'

interface IListingToolsProps {
  searchText?: string
  showInputSearch?: boolean
  onChangeSearchText?: (newText: string) => void
  newTextButton?: string
  showNewButton?: boolean
  onClickNew?: () => void
}

export function ListingTools({
  searchText = '',
  showInputSearch = false,
  onChangeSearchText,
  newTextButton = 'Novo',
  showNewButton = true,
  onClickNew,
}: IListingToolsProps) {
  const theme = useTheme()
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {showInputSearch && (
        <TextField
          size='small'
          value={searchText}
          onChange={(e) => onChangeSearchText?.(e.target.value)}
          placeholder={Environment.SEARCH_INPUT}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={onClickNew}
            endIcon={<Icon>add</Icon>}
          >
            {newTextButton}
          </Button>
        )}
      </Box>
    </Box>
  )
}