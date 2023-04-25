import { createSlice } from '@reduxjs/toolkit'

export const cateSlice = createSlice({
  name: 'cates',
  initialState: {
    cates: []
  },
  reducers: {
    setCates: (state, action) => {
      state.cates = action.payload
    }
  }
})

export const { setCates } = cateSlice.actions
export default cateSlice.reducer
