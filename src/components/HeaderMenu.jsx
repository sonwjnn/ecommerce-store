import { setAuthModalOpen } from '@/redux/features/authModelSlice'
import { setSignState } from '@/redux/features/signStateSlice'
import { setUser } from '@/redux/features/userSlice'
import { useState } from 'react'
import { RiGlobalLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import TextAvatar from './TextAvatar'

const actionState = {
  signin: 'signin',
  signup: 'signup',
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

  return (
    <ul className="nav-list text-sm">
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
              className="signup-btn mr-5 hover:text-sky-300 "
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
