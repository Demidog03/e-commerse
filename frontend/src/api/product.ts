import {apiWithAuthAndErrorMessaging} from './api.ts'
import {AxiosPromise} from './types.ts'
import {Product} from "../store/products/product.types.ts";

export const fetchProductsApi = async (): AxiosPromise<{products: Product[]}> => {
  return await apiWithAuthAndErrorMessaging.get('/products/')
}

export const fetchGetSelectedProductApi = async ({id}: {id: number}): AxiosPromise<{product: Product}> => {
  return await apiWithAuthAndErrorMessaging.get(`/products/${id}`)
}

export const fetchGetRecommendedProductsApi = async ({id}: {id: number}): AxiosPromise<{recommendedProducts: Product[]}> => {
  return await apiWithAuthAndErrorMessaging.get(`/products/recommended/${id}`)
}

export const fetchAddManyProductsApi = async ({products}: {products: Product[]}): AxiosPromise<{products: Product[]}> => {
  return await apiWithAuthAndErrorMessaging.post('/products/', {
    products
  })
}
