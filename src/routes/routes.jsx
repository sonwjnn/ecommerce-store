import HomePage from '../pages/HomePage'
import CartList from '../pages/CartList'
import ProductDetail from '../pages/ProductDetail'
import ProductList from '../pages/ProductList'
import ProductSearch from '../pages/ProductSearch'
import PasswordUpdate from '../pages/PasswordUpdate'
import ReviewList from '../pages/ReviewList'
import ProtectedPage from '../components/common/ProtectedPage'
import AuthUser from '../pages/AuthUser'

export const routesGen = {
  home: '/',
  mediaList: type => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: '/search',
  person: id => `/person/${id}`,
  favoriteList: '/favorites',
  reviewList: '/reviews',
  passwordUpdate: 'password-update'
}

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: 'home'
  },

  {
    path: '/search',
    element: <ProductSearch />,
    state: 'search'
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
    path: '/carts',
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
    path: '/:productType/:productId',
    element: <ProductDetail />
  },
  {
    path: '/authUser/signin',
    element: <AuthUser signin={'signin'} />
  },
  {
    path: '/authUser/signup',
    element: <AuthUser signup={'signup'} />
  }
]

export default routes
