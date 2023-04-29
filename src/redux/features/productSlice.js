import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    productsStore: [],
    productSearch: ''
  },
  reducers: {
    setProductsStore: (state, action) => {
      state.productsStore = action.payload
    },
    setProductSearch: (state, action) => {
      state.productSearch = action.payload
    }
  }
})

export const { setProductsStore, setProductSearch } = productSlice.actions
export default productSlice.reducer
