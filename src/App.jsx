import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './App.css'
import './assets/css/base.css'
import './assets/css/grid.css'
import './assets/css/main.css'
import './assets/css/responsive.css'
import PageNotFound from './components/PageNotFound'
import PageWrapper from './components/PageWrapper'
import ProductList from './components/ProductList'
import MainLayout from './layouts/MainLayout'
import ShopLayout from './layouts/ShopLayout'
import SubLayout from './layouts/SubLayout'
import routes from './routes/routes'

const App = () => {
  return (
    <>
      {/* config toastify */}
      <Toaster
        toastOptions={{
          style: {
            background: '#fff',
            color: '#333',
            fontSize: '16px',
          },
          position: 'bottom-center',
        }}
      />

      {/* app routes */}
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) =>
              route.index ? (
                <React.Fragment key={`main_${index}`}>
                  <Route
                    index
                    element={
                      route.state ? (
                        <PageWrapper state={route.state}>
                          {route.element}
                        </PageWrapper>
                      ) : (
                        route.element
                      )
                    }
                  />
                  <Route key="sublayout" path="/" element={<SubLayout />}>
                    <Route
                      key={`products_${route.cateName}_${route.typeName}`}
                      path={`/products/:cateName/:typeName`}
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
                      key={`/shops/:shopId/:shopCollection`}
                      path={`/shops/:shopId/:shopCollection`}
                      element={<ProductList type="shop" />}
                    />
                  </Route>
                </React.Fragment>
              ) : (
                <Route
                  path={route.path}
                  key={`route_${index}`}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            )}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>

      {/* app routes */}
    </>
  )
}

export default App
