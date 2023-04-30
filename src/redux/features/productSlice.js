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
    }
  }
})

export const { setProductsStore, setProductsSortPrice } = productSlice.actions
export default productSlice.reducer
