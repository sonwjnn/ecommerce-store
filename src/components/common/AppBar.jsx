import React from 'react'
import SearchMain from '../SearchMain'
import HeaderNavigate from '../HeaderNavigate'

const AppBar = () => {
  return (
    <>
      <div className="header w-full fixed">
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
