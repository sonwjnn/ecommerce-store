import NavigateMobile from '@/components/NavigateMobile'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header/Header'
import cartApi from '@/services/api/modules/cart.api'
import favoriteApi from '@/services/api/modules/favorite.api'
import shopApi from '@/services/api/modules/shop.api'
import userApi from '@/services/api/modules/user.api'
import SheetProvider from '@/services/providers/SheetProvider'
import {
  setListCarts,
  setListFavorites,
  setShop,
  setUser,
} from '@/services/redux/features/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

// Layout use for all pages
const MainLayout = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)

  //get user from redux store with JWT
  useEffect(() => {
    const auth = async () => {
      const { response, err } = await userApi.getInfo()
      if (response) {
        dispatch(setUser(response))
      } else dispatch(setUser(null))
    }
    auth()
  }, [dispatch])

  useEffect(() => {
    const cartsOfUser = async () => {
      const { response, err } = await cartApi.getList()
      if (response) dispatch(setListCarts(response))
    }
    cartsOfUser()
    if (!user) {
      dispatch(setListCarts([]))
    }
  }, [dispatch, user])

  useEffect(() => {
    const favoritesOfUser = async () => {
      const { response, err } = await favoriteApi.getList()
      if (response) dispatch(setListFavorites(response))
      else dispatch(setListFavorites([]))
    }
    favoritesOfUser()
    if (!user) {
      dispatch(setListFavorites([]))
    }
  }, [dispatch])

  useEffect(() => {
    const shopOfUser = async () => {
      const { response, err } = await shopApi.getInfo()
      if (response) dispatch(setShop(response))
      else dispatch(setShop(null))
    }
    shopOfUser()
    if (!user) {
      dispatch(setShop(null))
    }
  }, [dispatch, user])

  return (
    <>
      <SheetProvider />

      <div className="flex flex-col bg-accent bg-[url('/images/background.png')] font-be">
        {/* header */}
        <Header />
        {/* header */}

        {/* main */}
        <main className="flex-grow">
          <Outlet />
        </main>
        {/* main */}
        <div className=" fixed bottom-0 left-0 right-0 z-50 h-[64px] md:hidden">
          <NavigateMobile />
        </div>
      </div>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  )
}

export default MainLayout
