import cartApi from '@/apis/modules/cart.api'
import favoriteApi from '@/apis/modules/favorite.api'
import shopApi from '@/apis/modules/shop.api'
import userApi from '@/apis/modules/user.api'
import Footer from '@/components/Footer'
import GlobalLoading from '@/components/GlobalLoading'
import Header from '@/components/Header'
import NavigateMobile from '@/components/NavigateMobile'
import {
  setListCarts,
  setListFavorites,
  setShop,
  setUser,
} from '@/redux/features/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

// Layout use for all pages
const MainLayout = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)

  //get user from redux store with JWT
  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo()
      if (response) {
        dispatch(setUser(response))
      } else dispatch(setUser(null))
    }
    authUser()
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
  }, [dispatch])

  return (
    <>
      {/* global loading*/}
      <GlobalLoading />
      {/* global loading*/}

      {/* login loading*/}
      {/* <AuthModal /> */}
      {/* login loading*/}

      <div className="font-be flex  flex-col ">
        {/* header */}
        <Header />
        {/* header */}

        {/* main */}
        <main className="flex-grow">
          <Outlet />
        </main>
        {/* main */}
        <div className=" z-100 fixed bottom-0 left-0 right-0 h-[64px] lg:hidden">
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
