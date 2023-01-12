import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { LeftMenu } from './shared/components/LeftMenu'
import { DrawerProvider } from './shared/contexts/DrawerContext'
import { AppThemeProvider } from './shared/contexts/ThemeContext'

export function App() {

  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <LeftMenu>
            <AppRoutes />
          </LeftMenu>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  )
}

