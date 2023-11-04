import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const BoardBar = ({ handleSelectPriceOption }) => {
  const location = useLocation()
  const search = location.pathname.includes('search')
  const { types } = useSelector(state => state.types)
  return (
    <div className="mb-3">
      <div className="home-filter hide-on-mobile-tablet ">
        <span className="home-filter__lable  text-sm">Sắp xếp theo</span>
        <button className="home-filter__btn btn text-sm">Phổ biến</button>
        <button className="home-filter__btn btn btn-primary text-sm">
          Mới nhất
        </button>
        <button className="home-filter__btn btn text-sm">Bán chạy</button>

        <div className="select-input ">
          <span className="select-input__lable text-sm">Giá</span>
          <i className="select-input__icon ti-angle-down"></i>
          <ul className="select-input__menu top-[110%]">
            <li className="select-input__item">
              <button
                className="select-input__link py-2"
                onClick={handleSelectPriceOption}
              >
                <i className="select-input__icon ti-arrow-down text-sm"></i>
                <span className="ml-2 text-sm">Thấp đến cao</span>
              </button>
            </li>
            <li className="select-input__item">
              <button
                className="select-input__link py-2"
                onClick={handleSelectPriceOption}
              >
                <i className="select-input__icon ti-arrow-up text-sm"></i>
                <span className="ml-2 text-sm">Cao đến thấp</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="home-filter__page">
          <div className="home-filter__page-num text-base">
            <span className="home-filter__page-current ">1</span>/15
          </div>
          <div className="home-filter__page-move">
            <button className="home-filter__page-btn home-filter__page-btn--disable">
              <i className="home-filter__page-icon home-filter__page-icon--disable ti-angle-left"></i>
            </button>
            <button className="home-filter__page-btn">
              <i className="home-filter__page-icon ti-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
      <nav className={`mobile-category ${search ? 'hidden' : ''}`}>
        <ul className="mobile-category__list">
          {types.map(item => (
            <Link
              to={`/products/${item.name}`}
              className="mobile-category__item"
              key={item._id}
            >
              <button className="mobile-category__link">{item.name}</button>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default BoardBar
