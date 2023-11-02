import CartList from '@/pages/CartList'
import ProductDetail from '@/pages/ProductDetail'
import ProductSearch from '@/pages/ProductSearch'
import ReviewList from '@/pages/ReviewList'
import ProtectedPage from '@/components/ProtectedPage'
import AuthUser from '@/pages/AuthUser'
import AccountPage from '@/pages/AccountPage'
import HomePage from '@/pages/HomePage'
import PasswordUpdate from '@/components/PasswordUpdate'

export const routesGen = {
  home: '/',
  mediaList: type => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: '/search',
  person: id => `/person/${id}`,
  favoriteList: '/favorites',
  reviewList: '/reviews',
  passwordUpdate: '/password-update'
}

export const productType = [
  'Tất cả sản phẩm',
  'Chuột + Lót chuột',
  'Màn hình',
  'Tai nghe + Loa',
  'Laptop',
  'Laptop gaming',
  'Apple',
  'Bàn phím'
]

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: 'home'
  },

  {
    path: '/password-update',
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: 'password.update'
  },
  {
    path: 'user/carts',
    element: (
      <ProtectedPage>
        <CartList />
      </ProtectedPage>
    ),
    state: 'carts'
  },
  {
    path: '/reviews',
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: 'reviews'
  },
  {
    path: '/products/detail/:productId',
    element: <ProductDetail />
  },

  {
    path: '/authUser/:sign',
    element: <AuthUser />
  },
  {
    path: '/user/account/:accountType',
    element: (
      <ProtectedPage>
        <AccountPage />
      </ProtectedPage>
    )
  },
  {
    path: '/user/account/index',
    element: (
      <ProtectedPage>
        <AccountPage />
      </ProtectedPage>
    )
  },
  {
    path: '/user/:authCate',
    element: (
      <ProtectedPage>
        <AccountPage />
      </ProtectedPage>
    )
  },
  {
    path: '/search/:keyword',
    element: <ProductSearch />,
    state: 'search'
  },
  {
    path: '/reviews',
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: 'reviews'
  }
]

export default routes
