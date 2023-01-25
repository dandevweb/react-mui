import { Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'

interface IDetailToolsProps {
  newTextButton?: string

  showNewButton?: boolean
  showBackButton?: boolean
  showDeleteButton?: boolean
  showSaveButton?: boolean
  showSaveBackButton?: boolean

  showNewButtonLoading?: boolean
  showBackButtonLoading?: boolean
  showDeleteButtonLoading?: boolean
  showSaveButtonLoading?: boolean
  showSaveBackButtonLoading?: boolean

  onClickNew?: () => void
  onClickBack?: () => void
  onClickDelete?: () => void
  onClickSave?: () => void
  onClickSaveBack?: () => void

}

export function DetailTools({
  newTextButton = 'Novo',

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveBackButton = false,

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveBackButtonLoading = false,

  onClickNew,
  onClickBack,
  onClickDelete,
  onClickSave,
  onClickSaveBack,

}: IDetailToolsProps) {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

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
      {(showSaveButton && !showSaveButtonLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onClickSave}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant="button" noWrap>
            Salvar
          </Typography>

        </Button>
      )}
      {showSaveButtonLoading && (<Skeleton width={110} height={60} />)}

      {(showSaveBackButton && !showSaveBackButtonLoading && !smDown && !mdDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickSaveBack}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant="button" noWrap>
            Salvar e voltar
          </Typography>
        </Button>
      )}
      {(showSaveBackButtonLoading && !smDown && !mdDown) && (<Skeleton width={180} height={60} />)}


      {(showDeleteButton && !showDeleteButtonLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickDelete}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography variant="button" noWrap>
            Apagar
          </Typography>
        </Button>
      )}
      {showDeleteButtonLoading && (<Skeleton width={110} height={60} />)}


      {(showNewButton && !showNewButtonLoading && !smDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickNew}
          startIcon={<Icon>add</Icon>}
        >
          <Typography variant="button" noWrap>
            {newTextButton}
          </Typography>
        </Button>
      )}
      {(showNewButtonLoading && !smDown) && (<Skeleton width={110} height={60} />)}


      {
        (showBackButton &&
          (showNewButton || showDeleteButton || showSaveButton || showSaveBackButton)
        ) && (<Divider
          variant='middle'
          orientation='vertical'
        />)}

      {(showBackButton && !showBackButtonLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography variant="button" noWrap>
            Voltar
          </Typography>
        </Button>
      )}
      {showBackButtonLoading && (<Skeleton width={110} height={60} />)}

    </Box >
  )
}