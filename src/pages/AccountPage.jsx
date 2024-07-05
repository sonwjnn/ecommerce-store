import AccountSidebar from '@/components/AccountSidebar'
import FavoriteList from '@/components/FavoriteList'
import OrderList from '@/components/OrderList'
import PasswordUpdate from '@/components/PasswordUpdate'
import ProfileUpdate from '@/components/ProfileUpdate'
import ShopForm from '@/components/ShopForm'
import Container from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const AccountPage = () => {
  const { user, shop } = useSelector(state => state.user)
  const { accountType, authCate } = useParams()

  return (
    <Container className="mt-4">
      <Heading
        title="Tài khoản"
        description="Trang quản lí tài khoản của bạn."
      />
      <div className="flex gap-4 rounded-md ">
        <div className="hidden flex-[20%] flex-col py-8 pt-6  lg:flex">
          <AccountSidebar />
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
