import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
const firebaseConfig = {
  apiKey: 'AIzaSyCZaENUSGOZAAw8xNhNVKOhVSZj96MJq6Q',
  authDomain: 'client-shopee-clone.firebaseapp.com',
  projectId: 'client-shopee-clone',
  storageBucket: 'client-shopee-clone.appspot.com',
  messagingSenderId: '129235284193',
  appId: '1:129235284193:web:c3b552ee20eec6534287a0',
  measurementId: 'G-HFBN42NBLK'
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
const analytics = getAnalytics(app)
