import {api, apiWithAuthAndErrorMessaging} from './api.ts'
import {AxiosPromise} from './types.ts'
import {SignInBody, SignUpBody, User} from '../store/auth/auth.types.ts'

export const signupApi = async (body: SignUpBody): AxiosPromise<User> => {
  return await apiWithAuthAndErrorMessaging.post('/user/signup/', body)
}

export const signinApi = async (body: SignInBody): AxiosPromise<User> => {
  return await apiWithAuthAndErrorMessaging.post('/user/login/', body)
}

export const signinWithTokenApi = async ({token}: {token: string}): AxiosPromise<User> => {
  return await api.post('/user/token-login/', {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
