import './App.css'
import './assets/css/base.css'
import './assets/css/grid.css'
import './assets/css/main.css'
import './assets/css/responsive.css'

import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageWrapper from './components/common/PageWrapper'
import MainLayout from './components/layout/MainLayout'
import SubLayout from './components/layout/SubLayout'
import routes from './routes/routes'
import NotFound from './components/common/NotFound'
import ProductList from './components/common/ProductList'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const App = () => {
  return (
    <>
      {/* config toastify */}
      <Toaster
        toastOptions={{
          style: {
            background: '#fff',
            color: '#333',
            fontSize: '16px'
          },
          position: 'bottom-center'
        }}
      />

      {/* app routes */}
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) =>
              route.index ? (
                <>
                  <Route
                    index
                    key={index}
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
                      key="/products/:cateName/:typeName"
                      path="/products/:cateName/:typeName"
                      element={<ProductList />}
                    />
                  </Route>
                </>
              ) : (
                <Route
                  path={route.path}
                  key={index}
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>

      {/* app routes */}
    </>
  )
}

export default App
