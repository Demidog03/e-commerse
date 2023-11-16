import axios from 'axios'
import {fetchLogout, tokenSelector} from '../store/auth/auth.slice.ts'
import store from '../store'
import toast from 'react-hot-toast'

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.response.use(undefined, async (error) => {
  if (axios.isAxiosError(error) && error){
    console.log(error)
  }
  return await Promise.reject(error)
})

export const apiWithAuthAndErrorMessaging = axios.create({
  baseURL: `http://localhost:8000/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

apiWithAuthAndErrorMessaging.interceptors.request.use(async (config) => {
  const token = tokenSelector(store.getState())

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }

  return config
})

apiWithAuthAndErrorMessaging.interceptors.response.use(undefined, async (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      store.dispatch(fetchLogout())
    }
    toast.error(error.response?.data?.error ?? 'Internal Server Error')
  }
  return await Promise.reject(error)
})
