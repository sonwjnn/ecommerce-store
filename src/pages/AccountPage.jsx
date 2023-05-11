import { FaRegUser, FaUserCircle } from 'react-icons/fa'
import { SiReacthookform } from 'react-icons/si'
import { BsBell } from 'react-icons/bs'
import { AiOutlineTags } from 'react-icons/ai'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import PasswordUpdate from '../components/common/PasswordUpdate'
import FavoriteList from '../components/common/FavoriteList'

const AccountPage = () => {
  const { user } = useSelector(state => state.user)
  const [activeAccount, setActiveAccount] = useState(null)
  const { accountType, authCate } = useParams()
  const location = useLocation()

  const maxLength = 10
  let shorterName
  if (user.name.length > maxLength) {
    shorterName = user.name.substring(0, maxLength) + '...'
  } else {
    shorterName = user.name
  }

  const actionsAccount = [
    ['profile', 'hồ sơ'],
    ['password', 'đổi mật khẩu']
  ]

  const [onRequest, setOnRequest] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-bg_page px-0 xl:px-[136px] py-0 sm:py-[56px]   min-h-[80vh]">
      <div className=" h-full rounded-md max-w-[1220px] ">
        <div className="grid grid-cols-6 min-h-[66vh]">
          <div className="bg-bg_page col-span-1 p-4">
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 p-4">
                <div>
                  <FaUserCircle className=" text-[50px] text-gray-400" />
                </div>
                <div className="text-[16px] text-gray-600 font-semibold">
                  {shorterName}
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <FaRegUser className="self-start text-[22px] text-blue-600" />
                <div className="flex flex-col capitalize gap-3">
                  <span className="text-[16px]">
                    <Link to={'/user/account/profile'}>tài khoản của tôi</Link>
                  </span>
                  <div className="gap-2 flex flex-col">
                    {actionsAccount.map((action, index) => (
                      <Link
                        key={index}
                        to={`/user/account/${action[0]}`}
                        className={`action-account ${
                          activeAccount === index ? 'active' : ''
                        } capitalize text-gray-600  text-left text-[14px] ml-1`}
                        onClick={() => setActiveAccount(index)}
                      >
                        {action[1]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <button className="flex gap-3 items-center">
                <SiReacthookform className="text-[22px] text-orange-700" />
                <span className="text-[16px] capitalize">
                  <Link to={'/user/purchase'}>đơn mua</Link>
                </span>
              </button>

              <button className="flex gap-3 items-center">
                <BsBell className="text-[22px] text-yellow-500" />
                <span className="text-[16px] capitalize">thông báo</span>
              </button>

              <button className="flex gap-3 items-center">
                <AiOutlineTags className="text-[20px] text-purple-500" />
                <span className="text-[16px] capitalize">kho vouncher</span>
              </button>

              <button className="flex gap-3 items-center">
                <MdOutlineFavoriteBorder className="text-[20px] text-red-500" />
                <span className="text-[16px] capitalize">
                  <Link to={'/user/favorite'}>yêu thích</Link>
                </span>
              </button>
            </div>
          </div>
          <div className="bg-white h-full col-span-5 rounded-md p-4">
            <div className="text-[24px] py-4 text-gray-600 px-8 capitalize border-b-gray-200 border-b">
              {accountType === 'password'
                ? 'đổi mật khẩu'
                : accountType === 'profile'
                ? 'hồ sơ'
                : location.pathname === '/user/purchase'
                ? 'đơn hàng'
                : location.pathname === '/user/favorite'
                ? 'yêu thích'
                : ''}
            </div>
            {accountType === 'password' && <PasswordUpdate />}
            {authCate === 'favorite' && <FavoriteList />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
