import React from 'react'
import SearchMain from '../SearchMain'
import HeaderNavigate from '../HeaderNavigate'
import { useParams, useLocation } from 'react-router-dom'

const AppBar = () => {
  const location = useLocation()
  const { sign, productId, accountType, keyword } = useParams()
  const carts = location.pathname === '/user/carts'
  const purchase = location.pathname === '/user/purchase'
  return (
    <>
      <div
        className={`header bg-gradient-to-b from-bg_header_t to-bg_header_b  w-full ${
          sign || carts ? 'hidden' : ''
        } ${
          productId || accountType || purchase || keyword ? 'relative' : ''
        } ${!sign && !productId ? 'fixed' : ''}
        `}
      >
        <div className="grid wide">
          <HeaderNavigate />
          <SearchMain />
        </div>
      </div>
    </>
  )
}

export default AppBar
