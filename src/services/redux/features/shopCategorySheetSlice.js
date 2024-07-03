import { createSlice } from '@reduxjs/toolkit'

const shopCategorySheetSlice = createSlice({
  name: 'ShopCategorySheet',
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

export const { onOpen, onClose } = shopCategorySheetSlice.actions

export default shopCategorySheetSlice.reducer
