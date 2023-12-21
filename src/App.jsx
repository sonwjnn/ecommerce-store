import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './assets/css/styles.css'
import PageNotFound from './components/PageNotFound'
import PageWrapper from './components/PageWrapper'
import ProductList from './components/ProductList'
import MainLayout from './layouts/MainLayout'
import ShopLayout from './layouts/ShopLayout'
import SubLayout from './layouts/SubLayout'
import routes from './routes/routes'

const toastOptions = {
  style: {
    background: '#fff',
    color: '#333',
    fontSize: '16px',
  },
  position: 'bottom-center',
}

const renderRoute = (route, index) => {
  const element = route.state ? (
    <PageWrapper state={route.state}>{route.element}</PageWrapper>
  ) : (
    route.element
  )

  return route.index ? (
    <React.Fragment key={`main_${index}`}>
      <Route index element={element} />
      <Route key="sublayout" path="/" element={<SubLayout />}>
        <Route
          key={`products_/products/:cateSlug/:typeSlug`}
          path={`/products/:cateSlug/:typeSlug`}
          element={<ProductList type="product" />}
        />
      </Route>

      <Route key="shop-layout" path="/" element={<ShopLayout />}>
        <Route
          key={`/shops/:shopId`}
          path={`/shops/:shopId`}
          element={<ProductList type="shop" />}
        />
        <Route
          key={`/shops/:shopId/:typeSlug`}
          path={`/shops/:shopId/:typeSlug`}
          element={<ProductList type="shop" />}
        />
      </Route>
    </React.Fragment>
  ) : (
    <Route path={route.path} key={`route_${index}`} element={element} />
  )
}

const App = () => (
  <>
    <Toaster toastOptions={toastOptions} />

    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map(renderRoute)}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  </>
)

export default App
