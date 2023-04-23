import { Outlet } from 'react-router-dom'
import GlobalLoading from '../common/GlobalLoading.jsx'
import Footer from '../common/Footer.jsx'
import Appbar from '../common/AppBar.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import userApi from '../../apis/modules/user.api.js'
import cartApi from '../../apis/modules/cart.api'
import { setListCarts, setUser } from '../../redux/features/userSlice.js'
import { useCookies } from 'react-cookie'

// Layout use for all pages
const MainLayout = () => {
  const { authModalOpen } = useSelector(state => state.authModal)

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)

  const [cookie, setCookie, removeCookie] = useCookies()

  //get user from redux store with JWT
  useEffect(() => {
    // const authUser = async () => {
    //   const { response, err } = await userApi.getInfo()
    //   if (response.kq) dispatch(setUser(response))
    //   else dispatch(setUser(null))
    // }
    // authUser()
    if (!user) {
      removeCookie('actkn')
    }
  }, [dispatch])

  useEffect(() => {
    if (!user) dispatch(setListCarts([]))
  }, [user, dispatch])

  return (
    <>
      {/* global loading*/}
      <GlobalLoading />
      {/* global loading*/}

      {/* login loading*/}
      {/* <AuthModal /> */}
      {/* login loading*/}

      <div className="flex flex-col min-h-screen ">
        {/* header */}
        <Appbar />
        {/* header */}

        {/* main */}
        <main className="flex-grow overflow-hidden min-h-screen ">
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
