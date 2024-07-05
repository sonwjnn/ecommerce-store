import { createSlice } from '@reduxjs/toolkit'

const accountSheetSlice = createSlice({
  name: 'AccountSheet',
  initialState: {
    isOpen: false,
  },
  reducers: {
    onOpen: state => {
      state.isOpen = true
    },
    onClose: state => {
      state.isOpen = false
    },
  },
})

export const { onOpen, onClose } = accountSheetSlice.actions

export default accountSheetSlice.reducer
