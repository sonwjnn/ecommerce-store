import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    productsStore: [],
    productsSortPrice: null
  },
  reducers: {
    setProductsStore: (state, action) => {
      state.productsStore = action.payload
    },
    setProductsSortPrice: (state, action) => {
      state.productsSortPrice = action.payload
    },
    clearProductsStore: state => {
      state.productsStore = []
    }
  }
})

export const { setProductsStore, setProductsSortPrice, clearProductsStore } =
  productSlice.actions
export default productSlice.reducer
