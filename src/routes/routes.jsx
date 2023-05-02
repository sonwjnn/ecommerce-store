import CartList from '../pages/CartList'
import ProductDetail from '../pages/ProductDetail'
import ProductList from '../components/ProductList'
import ProductSearch from '../pages/ProductSearch'
import PasswordUpdate from '../pages/PasswordUpdate'
import ReviewList from '../pages/ReviewList'
import ProtectedPage from '../components/common/ProtectedPage'
import AuthUser from '../pages/AuthUser'
import AccountPage from '../pages/AccountPage'

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
    element: <ProductList />,
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
    path: '/:productType',
    element: <ProductList />
  },
  {
    path: 'products/:productType/:productId',
    element: <ProductDetail />
  },

  {
    path: '/authUser/:sign',
    element: <AuthUser />
  },
  {
    path: '/user/account/:accountType',
    element: <AccountPage />
  },
  {
    path: '/user/purchase',
    element: <AccountPage />
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
