import { createSlice } from '@reduxjs/toolkit'
import { useCookies } from 'react-cookie'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    listCarts: []
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setListCarts: (state, action) => {
      state.listCarts = action.payload
    },
    removeCart: (state, action) => {
      const { mediaId } = action.payload

      state.listCarts = [...state.listCarts].filter(
        e => e.mediaId.toString() !== mediaId.toString()
      )
    },
    addCart: (state, action) => {
      state.listCarts = [action.payload, ...state.listCarts]
    }
  }
})

export const { setUser, setListCarts, removeCart, addCart } = userSlice.actions

export default userSlice.reducer
