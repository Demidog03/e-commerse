import { useRoutes } from 'react-router-dom'
import './App.css'
import {router} from './routes.tsx'
import {useSelector} from './store'
import {spinnerSelector} from './store/spinner/spinner.slice.ts'
import Loading from './components/Loading.tsx'
import {fetchAuthWithToken} from "./store/auth/auth.slice.ts";
import {useDispatch} from "react-redux";
import {useEffectOnce} from "usehooks-ts";
import {useNavigate} from "react-router";

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const content = useRoutes(router)
  const spinner = useSelector(spinnerSelector)

  useEffectOnce(() => {
    const token = localStorage.getItem('accessToken')
    if(token) {
      dispatch(fetchAuthWithToken({token}))
    }
    else {
      navigate('/signin')
    }
  })

  return (
    <>
      <Loading loading={spinner}/>
      { content }
    </>
  )
}

export default App
