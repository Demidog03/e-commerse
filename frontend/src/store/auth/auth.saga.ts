import {authorize, fetchAuthWithToken, fetchLogout, logout, signin, signup} from './auth.slice.ts'
import {call, put, takeLeading} from 'redux-saga/effects'
import {ResponseType} from '../../api/types.ts'
import {setSpinnerOpen} from '../spinner/spinner.slice.ts'
import {signinApi, signinWithTokenApi, signupApi} from '../../api/auth.ts'

function* signinSaga(action: ReturnType<typeof signin>) {
  try {
    yield put(setSpinnerOpen(true))
    const response: ResponseType<ReturnType<typeof signinApi>> = yield call(signinApi, action.payload)
    yield put(authorize(response.data))
    localStorage.setItem('accessToken', response.data.token)
  } catch {}
  finally {
    yield put(setSpinnerOpen(false))
  }
}

function* signupSaga(action: ReturnType<typeof signup>) {
  try {
    yield put(setSpinnerOpen(true))
    const response: ResponseType<ReturnType<typeof signupApi>> = yield call(signupApi, action.payload)
    yield put(authorize(response.data))
    localStorage.setItem('accessToken', response.data.token)
  } catch {}
  finally {
    yield put(setSpinnerOpen(false))
  }
}

function* signinWithTokenSaga(action: ReturnType<typeof fetchAuthWithToken>) {
  try {
    yield put(setSpinnerOpen(true))
    const response: ResponseType<ReturnType<typeof signinWithTokenApi>> = yield call(signinWithTokenApi, action.payload)
    yield put(authorize(response.data))
    localStorage.setItem('accessToken', response.data.token)
  } catch {}
  finally {
    yield put(setSpinnerOpen(false))
  }
}

function* logoutSaga() {
  try {
    yield put(setSpinnerOpen(true))
    localStorage.removeItem('accessToken')
    yield put(logout())
  } catch {}
  finally {
    yield put(setSpinnerOpen(false))
  }
}

export function* authSaga(){
  yield takeLeading(signin.type, signinSaga)
  yield takeLeading(signup.type, signupSaga)
  yield takeLeading(fetchLogout.type, logoutSaga)
  yield takeLeading(fetchAuthWithToken.type, signinWithTokenSaga)
}
