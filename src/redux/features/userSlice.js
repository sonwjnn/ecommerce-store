import { createSlice } from '@reduxjs/toolkit'
import { forEach } from 'lodash'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    listCarts: [],
    listFavorites: []
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

    //carts
    setListCarts: (state, action) => {
      state.listCarts = action.payload
    },
    removeCart: (state, action) => {
      const { cartId } = action.payload

      state.listCarts = [...state.listCarts].filter(e => e._id !== cartId)
    },
    removeCarts: (state, action) => {
      const { cartIds } = action.payload
      state.listCarts = state.listCarts.filter(e => !cartIds.includes(e._id))
    },
    addCart: (state, action) => {
      let flag = 0
      state.listCarts.forEach(cart => {
        if (cart._id === action.payload._id) {
          flag++
          return
        }
      })
      if (!flag) state.listCarts = [action.payload, ...state.listCarts]
    },

    //favorites
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload
    },
    removeFavorite: (state, action) => {
      const { favoriteId } = action.payload

      state.listFavorites = [...state.listFavorites].filter(
        e => e._id !== favoriteId
      )
    },
    removeFavorites: (state, action) => {
      const { favoriteIds } = action.payload
      state.listFavorites = state.listFavorites.filter(
        e => !favoriteIds.includes(e._id)
      )
    },
    addFavorite: (state, action) => {
      if (Array.isArray(state.listFavorites)) {
        const favoriteIds = new Set(
          state.listFavorites.map(favorite => favorite._id)
        )
        if (!favoriteIds.has(action.payload._id)) {
          state.listFavorites = [action.payload, ...state.listFavorites]
        }
      }
    }
  }
})

export const {
  setUser,
  setListCarts,
  removeCart,
  removeCarts,
  addCart,
  setListFavorites,
  removeFavorite,
  removeFavorites,
  addFavorite
} = userSlice.actions

export default userSlice.reducer
