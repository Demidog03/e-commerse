import {CaseReducer, createAction, createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit'
import {RootState} from '../index.ts'
import {Product, ProductState} from './product.types.ts'

const initialState: ProductState = {
  products: [],
  recommendedProducts: [],
  selectedProduct: null
}

interface Reducers<State> extends SliceCaseReducers<State> {
  setProducts: CaseReducer<State, PayloadAction<{products: Product[]}>>
  setRecommendedProducts: CaseReducer<State, PayloadAction<{recommendedProducts: Product[]}>>
  setSelectedProduct: CaseReducer<State, PayloadAction<{product: Product} | null>>
}

const productSlice = createSlice<ProductState, Reducers<ProductState>>({
  name: 'auth',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products
    },
    setRecommendedProducts: (state, action) => {
      state.recommendedProducts = action.payload.recommendedProducts
    },
    setSelectedProduct: (state, action) => {
      if(action.payload) {
        state.selectedProduct = {...action.payload.product}
      }
      else {
        state.selectedProduct = null
      }
    }
  }
})

export const fetchGetProducts = createAction('auth/fetchGetProducts')
export const fetchGetRecommendedProducts = createAction<{id: number}>('auth/fetchGetRecommendedProducts')
export const fetchGetSelectedProduct = createAction<{id: number}>('auth/fetchGetSelectedProduct')
export const fetchAddManyProducts = createAction<{products: Product[]}>('auth/fetchAddManyProducts')

export const {
  setProducts,
  setSelectedProduct,
  setRecommendedProducts
} = productSlice.actions

export const productsSelector = (state: RootState): Product[] => state.product.products
export const recommendedProductsSelector = (state: RootState): Product[] => state.product.recommendedProducts
export const selectedProductSelector = (state: RootState): Product | null => state.product.selectedProduct

export default productSlice.reducer
