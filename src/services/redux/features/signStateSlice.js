import { createSlice } from '@reduxjs/toolkit'

export const signStateSlice = createSlice({
  name: 'SignState',
  initialState: {
    signState: '',
  },
  reducers: {
    setSignState: (state, action) => {
      state.signState = action.payload
    },
  },
})

export const { setSignState } = signStateSlice.actions

export default signStateSlice.reducer
