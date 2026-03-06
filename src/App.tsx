import './App.css'
import AppRoutes from './routes/AppRoutes';
import { CssVarsProvider } from '@mui/joy';
import theme from './theme';

const App = () => {
  return (
    <CssVarsProvider theme={theme}>
      <AppRoutes />
    </CssVarsProvider>
  )
}

export default App
