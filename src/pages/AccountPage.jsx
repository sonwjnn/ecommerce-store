import FavoriteList from '@/components/FavoriteList'
import { UserIcon } from '@/components/Icon'
import OrderList from '@/components/OrderList'
import PasswordUpdate from '@/components/PasswordUpdate'
import ProfileUpdate from '@/components/ProfileUpdate'
import ShopForm from '@/components/ShopForm'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { cn } from '@/utils/helpers'
import {
  LuBox,
  LuChevronDown,
  LuHeart,
  LuStore,
  LuUserCircle2,
} from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

const AccountPage = () => {
  const { user, shop } = useSelector(state => state.user)
  const navigate = useNavigate()
  const { accountType, authCate } = useParams()

  const actionsAccount = [
    ['profile', 'hồ sơ'],
    ['password', 'đổi mật khẩu'],
  ]

  return (
    <Container className="mt-4">
      <Heading
        title="Tài khoản"
        description="Trang quản lí tài khoản của bạn."
      />
      <div className="flex gap-4 rounded-md ">
        <div className={`flex flex-[20%] flex-col py-8 pt-6`}>
          <div className="flex h-full flex-col gap-y-2">
            <div className="flex gap-2">
              <Avatar className="size-10">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  <UserIcon size={40} />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xs text-gray-500">Tài khoản của</div>
                <div className="line-clamp-1 font-semibold text-primary md:text-xl lg:text-base">
                  {user?.name}
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={() => navigate('/user/account/profile')}
              className={cn(
                'flex items-center justify-start gap-3 hover:bg-neutral-900 hover:bg-opacity-10 active:scale-100',
                {
                  'bg-neutral-900 bg-opacity-10':
                    accountType === 'profile' || accountType === 'password',
                }
              )}
            >
              <LuUserCircle2 className="mt-8 text-3xl text-blue-600 md:mt-0 md:text-[22px]" />
              <span className="pt-0 text-left text-base font-normal">
                Thông tin tài khoản
              </span>
              <LuChevronDown className="text-lg text-gray-500" />
            </Button>

            <div className="flex w-full flex-col gap-2 px-12">
              {actionsAccount.map((action, index) => (
                <Link
                  key={index}
                  to={`/user/account/${action[0]}`}
                  className={cn(
                    'action-account ml-1 p-1  text-left text-xl capitalize text-gray-600 md:p-0 md:text-sm',
                    {
                      'active underline': accountType === action[0],
                    }
                  )}
                >
                  {action[1]}
                </Link>
              ))}
            </div>

            <Button
              variant="ghost"
              className={cn(
                'flex items-center gap-3 hover:bg-neutral-900 hover:bg-opacity-10 active:scale-100',
                {
                  'bg-neutral-900 bg-opacity-10': authCate === 'orders',
                }
              )}
              onClick={() => navigate('/user/orders')}
            >
              <LuBox className="text-3xl text-orange-700 md:text-[22px]" />
              <span className="w-full text-left text-base font-normal">
                Quản lí đơn hàng
              </span>
            </Button>

            <Button
              variant="ghost"
              className={cn(
                'flex items-center gap-3 hover:bg-neutral-900 hover:bg-opacity-10 active:scale-100',
                {
                  'bg-neutral-900 bg-opacity-10': authCate === 'favorite',
                }
              )}
              onClick={() => navigate('/user/favorite')}
            >
              <LuHeart className="text-3xl text-red-500 md:text-xl" />
              <span className="w-full text-left text-base font-normal">
                Sản phẩm yêu thích
              </span>
            </Button>

            {/* <Button
              variant="ghost"
              className={cn(
                'flex items-center gap-3 hover:bg-neutral-900 hover:bg-opacity-10 active:scale-100',
                {
                  'bg-neutral-900 bg-opacity-10': authCate === 'favorite',
                }
              )}
              onClick={() => navigate('/user/favorite')}
            >
              <LuStar className="text-3xl text-yellow-600 md:text-xl" />
              <span className="w-full text-left text-base font-normal">
                Đánh giá sản phẩm
              </span>
            </Button> */}

            <Button
              variant="ghost"
              className={cn(
                'flex items-center gap-3 hover:bg-neutral-900 hover:bg-opacity-10 active:scale-100',
                {
                  'bg-neutral-900 bg-opacity-10': authCate === 'shop',
                }
              )}
              onClick={() => navigate('/user/shop')}
            >
              <LuStore className="text-3xl text-purple-500 md:text-xl" />
              <span className="w-full text-left text-base font-normal">
                Cửa hàng của bạn
              </span>
            </Button>
          </div>
        </div>
        <div
          className={`w-full p-4 ${
            accountType || authCate ? 'block' : 'hidden'
          } flex-[80%] rounded-md bg-white`}
        >
          <div className="flex-1 space-y-4 p-8 pt-6">
            {accountType === 'profile' && <ProfileUpdate initialData={user} />}
            {accountType === 'password' && <PasswordUpdate />}
            {authCate === 'orders' && <OrderList />}
            {authCate === 'favorite' && <FavoriteList />}
            {authCate === 'shop' && <ShopForm initialData={shop} />}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AccountPage
