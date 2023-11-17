import {
  fetchAddManyProducts,
  fetchGetProducts, fetchGetRecommendedProducts, fetchGetSelectedProduct,
  setProducts, setRecommendedProducts, setSelectedProduct,
} from './product.slice.ts'
import {call, put, takeLeading} from 'redux-saga/effects'
import {ResponseType} from '../../api/types.ts'
import {setSpinnerOpen} from '../spinner/spinner.slice.ts'
import {
  fetchAddManyProductsApi,
  fetchGetRecommendedProductsApi,
  fetchGetSelectedProductApi,
  fetchProductsApi
} from "../../api/product.ts";

function* fetchProductsSaga() {
  try {
    yield put(setSpinnerOpen(true))
    const response: ResponseType<ReturnType<typeof fetchProductsApi>> = yield call(fetchProductsApi)
    yield put(setProducts(response.data))
  } catch {}
  finally {
    yield put(setSpinnerOpen(false))
  }
}

function* fetchGetSelectedProductSaga(action: ReturnType<typeof fetchGetSelectedProduct>) {
  try {
    yield put(setSpinnerOpen(true))
    const response: ResponseType<ReturnType<typeof fetchGetSelectedProductApi>> = yield call(fetchGetSelectedProductApi, action.payload)
    yield put(setSelectedProduct(response.data))
  } catch {}
  finally {
    yield put(setSpinnerOpen(false))
  }
}

function* fetchGetRecommendedProductSaga(action: ReturnType<typeof fetchGetRecommendedProducts>) {
  try {
    yield put(setSpinnerOpen(true))
    const response: ResponseType<ReturnType<typeof fetchGetRecommendedProductsApi>> = yield call(fetchGetRecommendedProductsApi, action.payload)
    yield put(setRecommendedProducts(response.data))
  } catch {}
  finally {
    yield put(setSpinnerOpen(false))
  }
}

function* fetchAddManyProductsSaga(action: ReturnType<typeof fetchAddManyProducts>) {
  try {
    yield put(setSpinnerOpen(true))
    const response: ResponseType<ReturnType<typeof fetchAddManyProductsApi>> = yield call(fetchAddManyProductsApi, action.payload)
    yield put(setProducts(response.data))
  } catch {}
  finally {
    yield put(setSpinnerOpen(false))
  }
}

export function* productSaga(){
  yield takeLeading(fetchGetProducts.type, fetchProductsSaga)
  yield takeLeading(fetchAddManyProducts.type, fetchAddManyProductsSaga)
  yield takeLeading(fetchGetSelectedProduct.type, fetchGetSelectedProductSaga)
  yield takeLeading(fetchGetRecommendedProducts.type, fetchGetRecommendedProductSaga)
}
