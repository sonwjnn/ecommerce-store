import { Outlet } from 'react-router-dom'
import GlobalLoading from '../common/GlobalLoading.jsx'
import Footer from '../common/Footer.jsx'
import Appbar from '../common/Appbar.jsx'
import AuthModal from '../common/AuthModal.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
// import userApi from '../../api/modules/user.api.js'
// import favoriteApi from '../../api/modules/favorite.api'
import { setListCarts, setUser } from '../../redux/features/userSlice.js'

// Layout use for all pages
const MainLayout = () => {
  const { authModalOpen } = useSelector(state => state.authModal)

  // const dispatch = useDispatch()

  // const { user } = useSelector(state => state.user)
  // const { themeMode } = useSelector(state => state.themeMode)

  // //get user from redux store with JWT
  // useEffect(() => {
  //   const authUser = async () => {
  //     const { response, err } = await userApi.getInfo()

  //     if (response) dispatch(setUser(response))
  //     if (err) dispatch(setUser(null))
  //   }

  //   authUser()
  // }, [dispatch])

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const { response, err } = await productApi.getList()
  //     if (response) dispatch(setListProducts(response))

  //     if (err) toast.error(err.message)
  //   }

  //   if (user) {
  //     localStorage.setItem('theme', themeMode)
  //     getProducts()
  //   }

  //   if (!user) dispatch(setListProducts([]))
  // }, [user, dispatch])

  return (
    <>
      {/* global loading*/}
      <GlobalLoading />
      {/* global loading*/}

      {/* login loading*/}
      <AuthModal />
      {/* login loading*/}

      <div className="flex min-h-screen">
        {/* header */}
        {!authModalOpen ? <Appbar /> : null}
        {/* header */}

        {/* main */}
        <main className="flex-grow overflow-hidden min-h-screen">
          <Outlet />
        </main>
        {/* main */}
      </div>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  )
}

export default MainLayout
