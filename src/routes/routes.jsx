import PageWrapper from '@/components/PageWrapper'
import PasswordUpdate from '@/components/PasswordUpdate'
import ProtectedPage from '@/components/ProtectedPage'
import AccountPage from '@/pages/AccountPage'
import AuthUser from '@/pages/AuthUser'
import CartList from '@/pages/CartList'
import HomePage from '@/pages/HomePage'
import OrderPage from '@/pages/OrderPage'
import ProductDetail from '@/pages/ProductDetail'
import ProductSearch from '@/pages/ProductSearch'
import ReviewList from '@/pages/ReviewList'

export const routesGen = {
  home: '/',
  mediaList: type => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: '/search',
  person: id => `/person/${id}`,
  favoriteList: '/favorites',
  reviewList: '/reviews',
  passwordUpdate: '/password-update',
}

export const productType = [
  'Tất cả sản phẩm',
  'Chuột + Lót chuột',
  'Màn hình',
  'Tai nghe + Loa',
  'Laptop',
  'Laptop gaming',
  'Apple',
  'Bàn phím',
]

const routes = [
  {
    index: true,
    element: (
      <PageWrapper>
        <HomePage />
      </PageWrapper>
    ),
    state: 'home',
  },

  {
    path: '/password-update',
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: 'password.update',
  },
  {
    path: 'user/carts',
    element: (
      <ProtectedPage>
        <CartList />
      </ProtectedPage>
    ),
    state: 'carts',
  },

  {
    path: '/products/detail/:productId',
    element: (
      <PageWrapper>
        <ProductDetail />
      </PageWrapper>
    ),
    state: 'product.detail',
  },

  {
    path: '/authUser/:sign',
    element: (
      <ProtectedPage>
        <AuthUser />
      </ProtectedPage>
    ),
    state: 'authUser',
  },
  {
    path: '/user/account/:accountType',
    element: (
      <ProtectedPage>
        <AccountPage />
      </ProtectedPage>
    ),
  },
  {
    path: '/user/account/index',
    element: (
      <ProtectedPage>
        <AccountPage />
      </ProtectedPage>
    ),
  },
  {
    path: '/user/:authCate',
    element: (
      <ProtectedPage>
        <AccountPage />
      </ProtectedPage>
    ),
  },
  {
    path: '/search/:keyword',
    element: <ProductSearch />,
    state: 'search',
  },
  {
    path: '/order',
    element: (
      <ProtectedPage>
        <OrderPage />
      </ProtectedPage>
    ),
    state: 'order',
  },
]

export default routes
