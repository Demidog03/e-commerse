import {all} from 'redux-saga/effects'
import {authSaga} from './auth/auth.saga.ts'

export function* rootSaga() {
  yield all([authSaga()])
}
