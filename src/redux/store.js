import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import authModalSlice from './features/authModelSlice'
import appStateSlice from './features/appStateSlice'
import globalLoadingSlice from './features/globalLoadingSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    authModal: authModalSlice,
    appState: appStateSlice,
    globalLoading: globalLoadingSlice
  }
})
