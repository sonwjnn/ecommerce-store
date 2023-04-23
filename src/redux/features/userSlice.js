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
      if (action.payload === null) {
        localStorage.removeItem('actkn')
      } else {
        if (action.payload.token)
          localStorage.setItem('actkn', action.payload.token)
      }
      state.user = action.payload
    },
    setListCarts: (state, action) => {
      state.listCarts = action.payload
    },
    removeCart: (state, action) => {
      const { cartId } = action.payload

      state.listCarts = [...state.listCarts].filter(e => e._id !== cartId)
    },
    addCart: (state, action) => {
      state.listCarts = [action.payload, ...state.listCarts]
    }
  }
})

export const { setUser, setListCarts, removeCart, addCart } = userSlice.actions

export default userSlice.reducer
