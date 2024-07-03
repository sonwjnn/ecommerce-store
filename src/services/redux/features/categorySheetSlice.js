import { createSlice } from '@reduxjs/toolkit'

const categorySheetSlice = createSlice({
  name: 'toggle',
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

export const { onOpen, onClose } = categorySheetSlice.actions

export default categorySheetSlice.reducer
