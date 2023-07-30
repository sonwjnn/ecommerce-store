import { createSlice } from '@reduxjs/toolkit'

export const typeSlice = createSlice({
  name: 'types',
  initialState: {
    types: []
  },
  reducers: {
    setTypes: (state, action) => {
      state.types = action.payload
    }
  }
})

export const { setTypes } = typeSlice.actions
export default typeSlice.reducer
