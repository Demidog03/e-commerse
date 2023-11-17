export interface ProductState{
  products: Product[]
  recommendedProducts: Product[]
  selectedProduct: Product | null
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

export interface Rating {
  rate: number
  count: number
}

export interface User {
  username: string
  token: string
}