import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import ProductFilter from './components/ProductFilter'
import ProductList from './components/ProductList'
import ErrorBoundaryFallback from './components/common/ErrorBoundaryFallback'
import PageWrapper from './components/common/PageWrapper'
import { Alert } from './components/common/alert'
import CategoryLayout from './layouts/CategoryLayout'
import MainLayout from './layouts/MainLayout'
import ShopLayout from './layouts/ShopLayout'
import routes from './routes/routes'
import { ToasterProvider } from './services/providers/ToasterProvider'
import '/public/css/styles.css'

const renderRoute = (route, index) => {
  const element = route.state ? (
    <PageWrapper state={route.state}>{route.element}</PageWrapper>
  ) : (
    route.element
  )

  return route.index ? (
    <React.Fragment key={`main_${index}`}>
      <Route index element={element} />
      <Route key="CategoryLayout" path="/" element={<CategoryLayout />}>
        <Route
          key={`products_/products/:cateSlug/:typeSlug`}
          path={`/products/:cateSlug/:typeSlug`}
          element={<ProductFilter />}
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
    <ToasterProvider />

    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onError={error => console.log(error)}
    >
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map(renderRoute)}
            <Route path="*" element={<Alert type="notfound" />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  </>
)

export default App
