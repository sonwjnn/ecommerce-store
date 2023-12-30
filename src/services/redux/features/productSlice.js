import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  advancedFilters: {
    name: 'all',
    category: 'all',
    // brand: 'all',
    price: [0, 50000000],
    rating: [0, 5],
    city: 'all',
    order: 0,
    totalPages: 1,
    currentPage: 1,
    count: 0,
    limit: 18,
  },
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAdvancedFilters: (state, action) => {
      state.advancedFilters = action.payload
    },
    setProductsStore: (state, action) => {
      state.products = action.payload
    },
    clearProductsStore: state => {
      state.products = []
    },
  },
})

export const { setAdvancedFilters, setProductsStore, clearProductsStore } =
  productSlice.actions
export default productSlice.reducer
