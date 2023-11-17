import { useRoutes } from 'react-router-dom'
import './App.css'
import {router} from './routes.tsx'
import {useSelector} from './store'
import {spinnerSelector} from './store/spinner/spinner.slice.ts'
import Loading from './components/Loading.tsx'
import {fetchAuthWithToken, tokenSelector} from "./store/auth/auth.slice.ts";
import {useDispatch} from "react-redux";
import {useEffectOnce} from "usehooks-ts";
import {useNavigate} from "react-router";
import {fetchAddManyProducts, fetchGetProducts, productsSelector} from "./store/products/product.slice.ts";
import {useEffect} from "react";
import productsData from "./data/products.json";
import {fetchProductsApi} from "./api/product.ts";

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const content = useRoutes(router)
  const spinner = useSelector(spinnerSelector)
  const token = useSelector(tokenSelector)
  const products = useSelector(productsSelector)

  useEffectOnce(() => {
    const token = localStorage.getItem('accessToken')
    if(token) {
      dispatch(fetchAuthWithToken({token}))
    }
    else {
      navigate('/signin')
    }
  })

  useEffect(() => {
    if(token) {
      dispatch(fetchGetProducts())
    }
  }, [token])

  useEffect(() => {
    if(token && products && products.length === 0) {
      void fetchInitialProducts()
    }
  }, [token, products])

  const fetchInitialProducts = async () => {
    const response = await fetchProductsApi()
    if(!response.data.products || response.data.products.length == 0) {
      dispatch(fetchAddManyProducts({products: productsData}))
    }
  }

  return (
    <>
      <Loading loading={spinner}/>
      { content }
    </>
  )
}

export default App
