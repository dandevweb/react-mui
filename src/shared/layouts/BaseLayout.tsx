import { Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { ReactNode } from 'react'
import { useDrawerContext } from '../contexts/DrawerContext'

interface IBaseLayoutProps {
  children: ReactNode
  title: string
  listingTools?: ReactNode
}

export const BaseLayout: React.FC<IBaseLayoutProps> = ({ children, title, listingTools }: IBaseLayoutProps) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const { toggleDrawerOpen } = useDrawerContext()
  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box padding={1} display='flex' alignItems='center' gap={1} height={theme.spacing(smDown ? 4 : mdDown ? 8 : 12)}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
        >
          {title}
        </Typography>
      </Box >

      {listingTools && (
        <Box>
          {listingTools}
        </Box >
      )}

      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box >
  )
}