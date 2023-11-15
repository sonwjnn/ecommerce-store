import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    listCarts: [],
    listFavorites: [],
    order: null,
    shop: null,
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
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
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
      const newCarts = state.listCarts.map(cart => {
        if (cart._id === action.payload._id) {
          flag++
          return {
            ...action.payload,
          }
        }
        return cart
      })
      if (!flag) state.listCarts = [action.payload, ...state.listCarts]
      else state.listCarts = newCarts
    },

    updateQuantityCart: (state, action) => {
      const newCarts = state.listCarts.map(cart => {
        if (cart._id === action.payload.cartId) {
          return {
            ...cart,
            ...action.payload,
          }
        }
        return cart
      })
      state.listCarts = newCarts
    },

    //favorites
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload
    },
    removeFavorite: (state, action) => {
      const { favoriteId } = action.payload

      state.listFavorites = state.listFavorites.filter(
        item => item.id !== favoriteId
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
    },
    setShop: (state, action) => {
      state.shop = action.payload
    },
    updateShop: (state, action) => {
      state.shop = { ...state.shop, ...action.payload }
    },

    //order
    setOrder: (state, action) => {
      state.order = action.payload
    },
    removeOrder: (state, action) => {
      state.order = null
    },
  },
})

export const {
  setUser,
  updateUser,
  setListCarts,
  removeCart,
  removeCarts,
  addCart,
  setListFavorites,
  removeFavorite,
  removeFavorites,
  addFavorite,
  setShop,
  updateShop,
  updateQuantityCart,
  setOrder,
  removeOrder,
} = userSlice.actions

export default userSlice.reducer
