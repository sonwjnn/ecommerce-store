import HomePage from '../pages/HomePage'
import CartList from '../pages/CartList'
import ProductDetail from '../pages/ProductDetail'
import ProductList from '../pages/ProductList'
import ProductSearch from '../pages/ProductSearch'
import PasswordUpdate from '../pages/PasswordUpdate'
import ReviewList from '../pages/ReviewList'
import ProtectedPage from '../components/common/ProtectedPage'
import AuthUser from '../pages/AuthUser'
import { useEffect } from 'react'
import BoardContent from '../components/BoardContent'

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

const pathProduct = productType.map((item, index) => ({
  path: `products/${item}`,
  element: <BoardContent productType={item} />
}))

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
    path: 'products/:cateType/:productId',
    element: <ProductDetail />
  },
  {
    path: '/authUser/signin',
    element: <AuthUser signin={'signin'} />
  },
  {
    path: '/authUser/signup',
    element: <AuthUser signup={'signup'} />
  },
  ...pathProduct
]

export default routes
