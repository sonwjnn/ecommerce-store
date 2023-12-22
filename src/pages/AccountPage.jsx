import FavoriteList from '@/components/FavoriteList'
import { UserIcon } from '@/components/Icon'
import OrderList from '@/components/OrderList'
import PasswordUpdate from '@/components/PasswordUpdate'
import ProfileUpdate from '@/components/ProfileUpdate'
import SignupShopForm from '@/components/SignupShopForm'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Container from '@/components/ui/container'
import { useEffect, useState } from 'react'
import { AiTwotoneShop } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { SiReacthookform } from 'react-icons/si'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'

const AccountPage = () => {
  const { user } = useSelector(state => state.user)
  const [activeAccount, setActiveAccount] = useState(null)
  const { accountType, authCate } = useParams()
  const location = useLocation()

  const actionsAccount = [
    ['profile', 'hồ sơ'],
    ['password', 'đổi mật khẩu'],
  ]

  return (
    <Container className="mt-8">
      <div className="flex min-h-[66vh] gap-4">
        <div
          className={`  ${
            accountType || authCate ? 'hidden' : ''
          } w-full md:block md:w-[250px]   `}
        >
          <div className="mt-10 flex h-full flex-col rounded-md bg-white  md:mt-0 md:gap-6 md:p-4 ">
            <div className="flex gap-2 p-4">
              <Avatar className="size-10">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <div className="line-clamp-2 text-[26px] font-semibold text-gray-600 md:text-xl lg:text-base">
                {user?.name}
              </div>
            </div>

            <div className="account-item  flex items-center  gap-3 ">
              <FaRegUser className="mt-8 self-start text-3xl text-blue-600 md:mt-0 md:text-[22px]" />
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
                      } ml-1 p-1  text-left text-xl capitalize text-gray-600 md:p-0 md:text-sm`}
                      onClick={() => setActiveAccount(index)}
                    >
                      {action[1]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <button className="account-item flex items-center gap-3">
              <SiReacthookform className="text-3xl text-orange-700 md:text-[22px]" />
              <span className="w-full text-left text-base capitalize">
                <Link to={'/user/orders'}>đơn mua</Link>
              </span>
            </button>

            <button className="account-item flex items-center gap-3">
              <MdOutlineFavoriteBorder className="text-3xl text-red-500 md:text-xl" />
              <span className="w-full text-left text-base capitalize">
                <Link to={'/user/favorite'}>yêu thích</Link>
              </span>
            </button>

            <button className="account-item flex items-center gap-3">
              <AiTwotoneShop className="text-3xl text-purple-500 md:text-xl" />
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
          <div className="border-b border-b-gray-200 px-8 py-4 text-2xl capitalize text-gray-600">
            {accountType === 'password'
              ? 'đổi mật khẩu'
              : accountType === 'profile'
              ? 'hồ sơ'
              : location.pathname === '/user/orders'
              ? 'đơn hàng'
              : location.pathname === '/user/favorite'
              ? 'yêu thích'
              : location.pathname === '/user/shop'
              ? 'shop'
              : ''}
          </div>
          {accountType === 'profile' && <ProfileUpdate />}
          {accountType === 'password' && <PasswordUpdate />}
          {authCate === 'orders' && <OrderList />}
          {authCate === 'favorite' && <FavoriteList />}
          {authCate === 'shop' && <SignupShopForm />}
        </div>
      </div>
    </Container>
  )
}

export default AccountPage
