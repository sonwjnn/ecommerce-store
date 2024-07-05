import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import accountSheetSlice from './features/accountSheetSlice'
import appStateSlice from './features/appStateSlice'
import authModalSlice from './features/authModelSlice'
import cateSlice from './features/cateSlice'
import categorySheetSlice from './features/categorySheetSlice'
import filterSheetSlice from './features/filterSheetSlice'
import productSlice from './features/productSlice'
import shopCategorySheetSlice from './features/shopCategorySheetSlice'
import signStateSlice from './features/signStateSlice'
import typeSlice from './features/typeSlice'
import userSlice from './features/userSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer = combineReducers({
  user: userSlice,
  authModal: authModalSlice,
  appState: appStateSlice,
  signState: signStateSlice,
  products: productSlice,
  cates: cateSlice,
  types: typeSlice,
  categorySheet: categorySheetSlice,
  filterSheet: filterSheetSlice,
  shopCategorySheet: shopCategorySheetSlice,
  accountSheet: accountSheetSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
