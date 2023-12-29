import { Button } from '@/components/ui/button'
import { socialNetworkLinks } from '@/utils/constants'
import { LuStore } from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import UserDropdown from './UserDropdown'

const HeaderNav = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)

  const onSignupClick = () => {
    navigate(`/auth/signup`)
  }
  const onSigninClick = () => {
    navigate(`/auth/signin`)
  }
  return (
    <nav className="hidden h-[50px] items-center justify-between bg-[radial-gradient(_circle_farthest-corner_at_10%_20%,rgba(253,193,104,1)_0%,rgba(251,128,128,1)_90%_)] md:flex">
      <div className="mx-auto flex w-full max-w-[1280px] justify-between px-6">
        <div className="flex items-center gap-x-4  text-sm">
          <Button
            className="text-white hover:bg-transparent hover:opacity-80"
            variant="ghost"
          >
            <a
              href="https://admin-shopee-clone.onrender.com/"
              target="_blank"
              className=" flex gap-x-1 no-underline"
            >
              <LuStore size={20} className="mr-2" />
              Kênh người bán
            </a>
          </Button>

          <div className=" flex items-center gap-x-2">
            <span className="mt-0.5 text-sm font-medium text-white">
              Kết nối
            </span>
            <div className="flex  gap-x-1">
              {socialNetworkLinks.map(item => {
                const Icon = item.icon
                return (
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:brightness-110"
                    key={item.title}
                    href={item.link}
                    target="_blank"
                  >
                    <Icon size={20} className="text-lg text-white" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
        <ul className="nav-list text-sm">
          <li className="">
            {user ? (
              <UserDropdown />
            ) : (
              <>
                <Button
                  className="text-white hover:bg-transparent hover:opacity-80"
                  variant="ghost"
                  onClick={onSignupClick}
                >
                  Đăng kí
                </Button>
                <Button
                  className="rounded-full bg-white text-[#242424] hover:bg-transparent hover:bg-white  hover:opacity-80"
                  onClick={onSigninClick}
                >
                  Đăng nhập
                </Button>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default HeaderNav
