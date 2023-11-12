import { socialNetworkLinks } from '@/utilities/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../ui/button'
import UserDropdown from './UserDropdown'

const HeaderNavigate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)

  const onSignupClick = () => {
    navigate(`/auth/signup`)
  }
  const onSigninClick = () => {
    navigate(`/auth/signin`)
  }
  return (
    <nav className="header__nav hide-on-mobile-tablet">
      <ul className="nav-list text-sm">
        <a
          href="https://admin-shopee-clone.onrender.com/"
          target="_blank"
          className="nav-list-item"
        >
          Kênh người bán
        </a>

        <li className="nav-list-item nav-list-item--separate flex gap-x-2">
          <span className="header__nav-title--no-pointer">Kết nối</span>
          <div className="flex gap-x-1">
            {socialNetworkLinks.map(item => {
              const Icon = item.icon
              return (
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:brightness-110"
                  key={item.title}
                  href={item.link}
                  target="_blank"
                >
                  <Icon className="text-lg text-white" />
                </a>
              )
            })}
          </div>
        </li>
      </ul>
      <ul className="nav-list text-sm">
        <li className="nav-list-item nav-list-item-user">
          {user ? (
            <UserDropdown />
          ) : (
            <>
              <Button
                className="hover:bg-transparent hover:text-white hover:opacity-80"
                variant="ghost"
                onClick={onSignupClick}
              >
                Đăng kí
              </Button>
              <Button
                className="hover:bg-transparent hover:text-white hover:opacity-80"
                variant="ghost"
                onClick={onSigninClick}
              >
                Đăng nhập
              </Button>
            </>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default HeaderNavigate
