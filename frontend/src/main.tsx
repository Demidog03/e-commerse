import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import {ThemeProvider} from '@mui/material'
import DEFAULT_THEME from '../theme.tsx'
import { Toaster } from './containers/Toaster.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={DEFAULT_THEME}>
          <App />
          <Toaster/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
)
