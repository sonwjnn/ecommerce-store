import React from 'react'
import SearchMain from '../SearchMain'
import HeaderNavigate from '../HeaderNavigate'
import { useParams, useLocation } from 'react-router-dom'

const AppBar = () => {
  const location = useLocation()
  const { sign, productId, accountType } = useParams()
  const carts = location.pathname === 'user/carts'
  return (
    <>
      <div
        className={`header bg-gradient-to-b from-bg_header_t to-bg_header_b  w-full ${
          sign || carts ? 'hidden' : ''
        } ${productId || accountType ? 'relative' : ''} ${
          !sign && !productId ? 'fixed' : ''
        }
        `}
      >
        <div className="grid wide">
          <HeaderNavigate />
          <SearchMain />
        </div>
        {/* <ul className="header__sort-bar">
          <li className="header__sort-item">
            <a href="" className="header__sort-link">
              Liên quan
            </a>
          </li>
          <li className="header__sort-item header__sort-item--active">
            <a href="" className="header__sort-link">
              Mới nhất
            </a>
          </li>
          <li className="header__sort-item">
            <a href="" className="header__sort-link">
              Bán chạy
            </a>
          </li>
          <li className="header__sort-item">
            <a href="" className="header__sort-link">
              Giá
            </a>
          </li>
        </ul> */}
      </div>
    </>
  )
}

export default AppBar
