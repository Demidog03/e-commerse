import {CaseReducer, createAction, createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit'
import {RootState} from '../index.ts'
import {AuthState, SignInBody, SignUpBody, User} from './auth.types.ts'

const initialState: AuthState = {
  user: null
}

interface Reducers<State> extends SliceCaseReducers<State> {
  authorize: CaseReducer<State, PayloadAction<User>>
  logout: CaseReducer<State, PayloadAction>
}

const authSlice = createSlice<AuthState, Reducers<AuthState>>({
  name: 'auth',
  initialState,
  reducers: {
    authorize: (state, action) => {
      state.user = {...action.payload}
    },
    logout: (state) => {
      state.user = null
    }
  }
})

export const signin = createAction<SignInBody>('auth/signin')
export const signup = createAction<SignUpBody>('auth/signup')
export const fetchLogout = createAction('auth/fetchLogout')
export const fetchAuthWithToken = createAction<{token: string}>('auth/fetchAuthWithToken')

export const {
  authorize,
  logout
} = authSlice.actions

export const userSelector = (state: RootState): User | null => state.auth.user
export const isAuthenticatedSelector = (state: RootState): boolean => !!state.auth.user
export const tokenSelector = (state: RootState): string | undefined => state.auth.user?.token

export default authSlice.reducer
