import {configureStore, MiddlewareArray} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import postReducer from './post/post.slice.ts'
import spinnerReducer from './spinner/spinner.slice.ts'
import authReducer from './auth/auth.slice.ts'
import productReducer from './products/product.slice.ts'
import {rootSaga} from './rootSaga.ts'
import {TypedUseSelectorHook, useSelector as useReduxSelector} from 'react-redux'

const sagaMiddleware = createSagaMiddleware()
const middleware = new MiddlewareArray(sagaMiddleware)
const store = configureStore({
  reducer: {
    post: postReducer,
    spinner: spinnerReducer,
    auth: authReducer,
    product: productReducer
  },
  devTools: true,
  middleware
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export default store
