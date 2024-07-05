import { createSlice } from '@reduxjs/toolkit'

const filterSheetSlice = createSlice({
  name: 'FilterSheetSlice',
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

export const { onOpen, onClose } = filterSheetSlice.actions

export default filterSheetSlice.reducer
