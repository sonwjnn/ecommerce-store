import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { productType } from '../routes/routes'

const BoardBar = props => {
  const { cates } = useSelector(state => state.cates)
  const { handleSortPriceDownUp, handleSortPriceUpDown } = props
  return (
    <>
      <div className="home-filter hide-on-mobile-tablet">
        <span className="home-filter__lable">Sắp xếp theo</span>
        <button className="home-filter__btn btn">Phổ biến</button>
        <button className="home-filter__btn btn btn-primary">Mới nhất</button>
        <button className="home-filter__btn btn">Bán chạy</button>

        <div className="select-input ">
          <span className="select-input__lable">Giá</span>
          <i className="select-input__icon ti-angle-down"></i>
          <ul className="select-input__menu top-[110%]">
            <li className="select-input__item">
              <button
                className="select-input__link "
                onClick={handleSortPriceDownUp}
              >
                <i className="select-input__icon ti-arrow-down"></i>
                <span className="ml-2">Thấp đến cao</span>
              </button>
            </li>
            <li className="select-input__item">
              <button
                className="select-input__link "
                onClick={handleSortPriceUpDown}
              >
                <i className="select-input__icon ti-arrow-up"></i>
                <span className="ml-2">Cao đến thấp</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="home-filter__page">
          <div className="home-filter__page-num">
            <span className="home-filter__page-current">1</span>/15
          </div>
          <div className="home-filter__page-move">
            <a
              href=""
              className="home-filter__page-btn home-filter__page-btn--disable"
            >
              <i className="home-filter__page-icon home-filter__page-icon--disable ti-angle-left"></i>
            </a>
            <a href="" className="home-filter__page-btn">
              <i className="home-filter__page-icon ti-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
      <nav className="mobile-category">
        <ul className="mobile-category__list">
          {cates.map((item, index) => (
            <Link
              to={`/products/${productType[index]}`}
              className="mobile-category__item"
              key={item._id}
            >
              <button className="mobile-category__link">{item.name}</button>
            </Link>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default BoardBar
