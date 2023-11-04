import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import HeaderNavigate from './HeaderNavigate'
import SearchMain from './SearchMain'

const AppBar = () => {
  const location = useLocation()
  const { sign, productId, accountType, keyword, authCate } = useParams()
  const carts = location.pathname === '/user/carts'

  return (
    <>
      <div
        className={` header w-full  bg-gradient-to-b from-bg_header_b  to-bg_header_t  ${
          sign || carts ? 'hidden' : ''
        } ${
          productId ||
          accountType ||
          authCate ||
          keyword ||
          location.pathname.includes('account')
            ? 'relative'
            : ''
        } ${!sign && !productId ? 'fixed' : ''}
        `}
      >
        <div className="wide grid">
          <HeaderNavigate />
          <SearchMain />
        </div>
      </div>
    </>
  )
}

export default AppBar
