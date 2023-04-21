import { createSlice } from '@reduxjs/toolkit'

export const productLoadingSlice = createSlice({
  name: 'ProductLoading',
  initialState: {
    productLoading: false
  },
  reducers: {
    setProductLoading: (state, action) => {
      state.productLoading = action.payload
    }
  }
})

export const { setProductLoading } = productLoadingSlice.actions

export default productLoadingSlice.reducer
