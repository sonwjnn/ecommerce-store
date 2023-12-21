import PasswordUpdate from '@/components/PasswordUpdate'
import ProtectedPage from '@/components/ProtectedPage'
import AccountPage from '@/pages/AccountPage'
import AuthPage from '@/pages/AuthPage'
import CartList from '@/pages/CartList'
import CheckoutPage from '@/pages/CheckoutPage'
import HomePage from '@/pages/HomePage'
import OrderDetails from '@/pages/OrderDetails'
import ProductDetail from '@/pages/ProductDetail'
import ProductSearch from '@/pages/ProductSearch'

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

const routes = [
  {
    index: true,
    element: <HomePage />,
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
    path: '/user/carts',
    element: (
      <ProtectedPage>
        <CartList />
      </ProtectedPage>
    ),
    state: 'carts',
  },

  {
    path: '/products/detail/:productId',
    element: <ProductDetail />,
    state: 'product.detail',
  },

  {
    path: '/auth/:sign',
    element: (
      <ProtectedPage>
        <AuthPage />
      </ProtectedPage>
    ),
    state: 'auth',
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
    path: '/checkout',
    element: (
      <ProtectedPage>
        <CheckoutPage />
      </ProtectedPage>
    ),
    state: 'checkout',
  },

  {
    path: '/order/:orderId',
    element: <OrderDetails />,
    state: 'order.detail',
  },
]

export default routes
