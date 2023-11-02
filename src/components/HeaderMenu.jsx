import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setAuthModalOpen } from '@/redux/features/authModelSlice'
import { setSignState } from '@/redux/features/signStateSlice'
import { setUser } from '@/redux/features/userSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { RiGlobalLine } from 'react-icons/ri'
import TextAvatar from './TextAvatar'

const actionState = {
  signin: 'signin',
  signup: 'signup'
}
const HeaderMenu = () => {
  const history = useNavigate()
  const location = useLocation()

  const authUserPage = value => {
    history(`/authUser/${value}`)
  }
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

  const checkUserRoute = location.pathname.includes('user')

  const urlNotify = new URL('@/assets/img/notify-product.jfif', import.meta.url)
    .href
  return (
    <ul className="nav-list text-sm">
      <li className="nav-list-item">
        <button href="" className="nav-item-link">
          <i className="nav-icon fa-regular fa-bell mr-2 text-base"></i>
          Thông báo
        </button>
      </li>
      <li className="nav-list-item ">
        <button className="nav-item-link">
          <i className="nav-icon fa-regular fa-circle-question mr-2 text-base"></i>
          Trợ giúp
        </button>
      </li>
      <li className="nav-list-item ">
        <button className="nav-item-link">
          <RiGlobalLine className="text-[20px] mr-2" />
          Tiếng Việt
          <i className="nav-icon fa-solid fa-angle-down ml-4 mr-2"></i>
        </button>
        <div className="language-item-add"></div>
        <div className="nav-language">
          <button className="language-item w-full text-left">Tiếng Việt</button>
          <button className="language-item w-full text-left">English</button>
        </div>
      </li>

      <li className="nav-list-item nav-list-item-user">
        <div className="nav-list-item-user-add"></div>

        {user ? (
          <>
            <span className="h-[30px] w-[30px] ">
              <TextAvatar text={user.name} />
            </span>
            <span className="nav-list-item-user-name text-base">
              {user.name ? user.name : 'null'}
            </span>
            <ul className="nav-list-item-user-menu text-base">
              <li className="nav-list-item-user-menu-item ">
                <button>
                  <Link to={'/user/account/profile'}>Tài khoản</Link>
                </button>
              </li>
              <li className="nav-list-item-user-menu-item">
                <Link to={'/user/purchase'}>
                  <button>Đơn mua</button>
                </Link>
              </li>
              <li className="nav-list-item-user-menu-item">
                <Link to={'/user/favorite'}>
                  <button>Yêu thích</button>
                </Link>
              </li>
              <li className="nav-list-item-user-menu-item">
                <Link to={checkUserRoute ? '/' : null}>
                  <button
                    onClick={() => {
                      dispatch(setUser(null))
                    }}
                  >
                    Đăng xuất
                  </button>
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <button
              className="signup-btn hover:text-sky-300 mr-5 "
              onClick={() => {
                authUserPage(actionState.signup)
              }}
            >
              Đăng kí
            </button>
            <button
              className="signin-btn hover:text-sky-300 "
              onClick={() => {
                authUserPage(actionState.signin)
              }}
            >
              Đăng nhập
            </button>
          </>
        )}
      </li>
    </ul>
  )
}

export default HeaderMenu
