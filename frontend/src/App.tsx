import { useRoutes } from 'react-router-dom'
import './App.css'
import {router} from './routes.tsx'
import {useSelector} from './store'
import {spinnerSelector} from './store/spinner/spinner.slice.ts'
import Loading from './components/Loading.tsx'

function App() {
  const content = useRoutes(router)
  const spinner = useSelector(spinnerSelector)

  return (
    <>
      <Loading loading={spinner}/>
      { content }
    </>
  )
}

export default App
