import { MdKeyboardArrowDown } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { Button } from './ui/button'

const BoardBar = ({ handleSelectPriceOption }) => {
  const location = useLocation()
  const search = location.pathname.includes('search')
  const { types } = useSelector(state => state.types)
  return (
    <div className="mb-3">
      <div className="home-filter hide-on-mobile-tablet  rounded-md bg-accent">
        <span className="home-filter__lable  mr-3 text-sm">Sắp xếp theo</span>
        <div className="flex gap-x-2">
          <Button className="border-none bg-white font-normal text-black  hover:bg-accent">
            Phổ biến
          </Button>
          <Button variant="secondary">Mới nhất</Button>
          <Button className="border-none bg-white font-normal text-black hover:bg-accent">
            Bán chạy
          </Button>
        </div>

        <div className="select-input cursor-pointer rounded-md">
          <span className="select-input__lable text-sm ">Giá</span>
          <MdKeyboardArrowDown />
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
        {/* <div className="home-filter__page">
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
        </div> */}
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
