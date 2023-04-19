import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    productsStore: []
  },
  reducers: {
    setProductsStore: (state, action) => {
      state.productsStore = action.payload
    }
  }
})

export const { setProductsStore } = productSlice.actions
export default productSlice.reducer
