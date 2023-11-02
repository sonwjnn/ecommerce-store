import { Outlet } from 'react-router-dom'
import GlobalLoading from '@/components/GlobalLoading'
import Footer from '@/components/Footer'
import Appbar from '@/components/AppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import userApi from '@/apis/modules/user.api'
import cartApi from '@/apis/modules/cart.api'
import {
  setListCarts,
  setListFavorites,
  setUser
} from '@/redux/features/userSlice'
import NavigateMobile from '@/components/NavigateMobile'
import favoriteApi from '@/apis/modules/favorite.api'

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
  }, [user, dispatch])

  useEffect(() => {
    const favoritesOfUser = async () => {
      const { response, err } = await favoriteApi.getList()
      if (response) dispatch(setListFavorites(response))
    }
    favoritesOfUser()
    if (!user) {
      dispatch(setListFavorites([]))
    }
  }, [user, dispatch])

  return (
    <>
      {/* global loading*/}
      <GlobalLoading />
      {/* global loading*/}

      {/* login loading*/}
      {/* <AuthModal /> */}
      {/* login loading*/}

      <div className="flex flex-col  font-roboto ">
        {/* header */}
        <Appbar />
        {/* header */}

        {/* main */}
        <main className="flex-grow">
          <Outlet />
        </main>
        {/* main */}
        <div className=" lg:hidden h-[64px] fixed bottom-0 left-0 right-0 z-100">
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
