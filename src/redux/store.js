import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import authModalSlice from './features/authModelSlice'
import appStateSlice from './features/appStateSlice'
import globalLoadingSlice from './features/globalLoadingSlice'
import signStateSlice from './features/signStateSlice'
import productSlice from './features/productSlice'
import productLoadingSlice from './features/productLoading'
import typeSlice from './features/typeSlice'
import storage from 'redux-persist/lib/storage'
import cateSlice from './features/cateSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}
const rootReducer = combineReducers({
  user: userSlice,
  authModal: authModalSlice,
  appState: appStateSlice,
  globalLoading: globalLoadingSlice,
  signState: signStateSlice,
  products: productSlice,
  productLoading: productLoadingSlice,
  cates: cateSlice,
  types: typeSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export let persistor = persistStore(store)
