import FavoriteList from '@/components/FavoriteList'
import PasswordUpdate from '@/components/PasswordUpdate'
import ProfileUpdate from '@/components/ProfileUpdate'
import PurchaseList from '@/components/PurchaseList'
import ShowUserShop from '@/components/ShowUserShop'
import TextAvatar from '@/components/TextAvatar'
import { useEffect, useState } from 'react'
import { AiOutlineTags, AiTwotoneShop } from 'react-icons/ai'
import { BsBell } from 'react-icons/bs'
import { FaRegUser, FaUserCircle } from 'react-icons/fa'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { SiReacthookform } from 'react-icons/si'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'

const AccountPage = () => {
  const { user } = useSelector(state => state.user)
  const [activeAccount, setActiveAccount] = useState(null)
  const { accountType, authCate } = useParams()
  const location = useLocation()
  const [onChange, setOnChange] = useState(false)

  const actionsAccount = [
    ['profile', 'hồ sơ'],
    ['password', 'đổi mật khẩu'],
  ]

  const [onRequest, setOnRequest] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-[80vh] bg-white px-0 py-0 sm:py-[56px] md:bg-bg_page   xl:px-[136px]">
      <div className=" h-full max-w-[1220px] rounded-md ">
        <div className="flex min-h-[66vh]">
          <div
            className={`bg-white md:bg-bg_page ${
              accountType || authCate ? 'hidden' : ''
            } w-full md:block md:w-[250px]   md:p-4`}
          >
            <div className="mt-10 flex flex-col md:mt-0  md:gap-6 md:px-0">
              <div className="flex gap-2 p-4">
                <div className="min-h-[50px] min-w-[50px] ">
                  <TextAvatar text={user.name} />
                </div>
                <div className="line-clamp-2 text-[26px] font-semibold text-gray-600 md:text-[20px] lg:text-base">
                  {user.name}
                </div>
              </div>

              <div className="account-item  flex items-center  gap-3 ">
                <FaRegUser className="mt-8 self-start text-[30px] text-blue-600 md:mt-0 md:text-[22px]" />
                <div className="flex w-full flex-col gap-3 capitalize">
                  <span className="pt-0 text-base">
                    <Link to={'/user/account/profile'}>tài khoản của tôi</Link>
                  </span>
                  <div className="flex flex-col gap-2 ">
                    {actionsAccount.map((action, index) => (
                      <Link
                        key={index}
                        to={`/user/account/${action[0]}`}
                        className={`action-account ${
                          activeAccount === index ? 'active' : ''
                        } ml-1 p-1  text-left text-[20px] capitalize text-gray-600 md:p-0 md:text-sm`}
                        onClick={() => setActiveAccount(index)}
                      >
                        {action[1]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <button className="account-item flex items-center gap-3">
                <SiReacthookform className="text-[30px] text-orange-700 md:text-[22px]" />
                <span className="w-full text-left text-base capitalize">
                  <Link to={'/user/purchase'}>đơn mua</Link>
                </span>
              </button>

              <button className="account-item flex items-center gap-3">
                <BsBell className="text-[30px] text-yellow-500 md:text-[22px]" />
                <span className="w-full text-left text-base capitalize">
                  thông báo
                </span>
              </button>

              <button className="account-item flex items-center gap-3">
                <AiOutlineTags className="text-[32px] text-purple-500 md:text-[20px]" />
                <span className="w-full text-left text-base capitalize">
                  kho vouncher
                </span>
              </button>

              <button className="account-item flex items-center gap-3">
                <MdOutlineFavoriteBorder className="text-[30px] text-red-500 md:text-[20px]" />
                <span className="w-full text-left text-base capitalize">
                  <Link to={'/user/favorite'}>yêu thích</Link>
                </span>
              </button>

              <button className="account-item flex items-center gap-3">
                <AiTwotoneShop className="text-[30px] text-purple-500 md:text-[20px]" />
                <span className="w-full text-left text-base capitalize">
                  <Link to={'/user/shop'}>Shop</Link>
                </span>
              </button>
            </div>
          </div>
          <div
            className={`w-full  rounded-md bg-white p-4 ${
              accountType || authCate ? 'block' : 'hidden'
            } md:block`}
          >
            <div className="border-b border-b-gray-200 px-8 py-4 text-[24px] capitalize text-gray-600">
              {accountType === 'password'
                ? 'đổi mật khẩu'
                : accountType === 'profile'
                ? 'hồ sơ'
                : location.pathname === '/user/purchase'
                ? 'đơn hàng'
                : location.pathname === '/user/favorite'
                ? 'yêu thích'
                : location.pathname === '/user/shop'
                ? 'shop'
                : ''}
            </div>
            {accountType === 'profile' && <ProfileUpdate />}
            {accountType === 'password' && <PasswordUpdate />}
            {authCate === 'purchase' && <PurchaseList />}
            {authCate === 'favorite' && <FavoriteList />}
            {authCate === 'shop' && <ShowUserShop />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
