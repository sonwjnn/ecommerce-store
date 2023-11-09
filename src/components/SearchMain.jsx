import { CartItem } from '@/pages/CartList'
import { shorterString } from '@/utilities/constants'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BiSearch } from 'react-icons/bi'
import { CgShoppingCart } from 'react-icons/cg'
import { IoMdArrowBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import CartPreview from './CartPreview'
import { Button } from './ui/button'
import { Input } from './ui/input'

const SearchMain = () => {
  const { user, listCarts } = useSelector(state => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const searchInput = useRef()
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (!location.pathname.includes('search')) {
      setKeyword('')
    }
  }, [location])

  const handleSubmitSearch = e => {
    e.preventDefault()
    if (keyword.trim()) navigate(`/search/${encodeURIComponent(keyword)}`)
    else {
      searchInput.current.focus()
      setKeyword('')
    }
  }

  const handleCarts = () => {
    if (user) {
      navigate('/user/carts')
    } else {
      toast.warning('You must login first!', { toastId: 'warning-login' })
      navigate('/authUser/signin')
    }
  }

  const goBackPage = () => {
    navigate(-1)
  }

  return (
    <div className="header-with-search">
      <div className="header__logo hide-on-tablet h-full">
        <Link to="/" className="block h-full w-full">
          <div
            className="h-[50px] w-[150px] bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${
                new URL(`../assets/img/logos/logo_header.svg`, import.meta.url)
                  .href
              })`,
            }}
          ></div>
        </Link>
      </div>
      <div
        className={`back flex w-[50px] items-center justify-start md:hidden ${
          location.pathname === '/' ? 'hidden' : 'block'
        }`}
        onClick={goBackPage}
      >
        <IoMdArrowBack className={`text-4xl text-white `} />
      </div>

      <input
        hidden
        type="checkbox"
        className="header__search-checkbox "
        id="mobile-search-checkbox"
      />

      <div className="header__search-wrap">
        <div className="header__search rounded-sm">
          <div className="header__search-input-wrap">
            <form onSubmit={handleSubmitSearch} className="relative h-full">
              <Input
                type="text"
                className="h-full border-none focus-visible:ring-0"
                placeholder="Nhập sản phẩm để tìm kiếm"
                value={keyword}
                ref={searchInput}
                onChange={event => setKeyword(event.target.value)}
              />
            </form>
            <div className="header__search-history">
              <div className="header__search-history-heading">
                Lịch sử tìm kiếm
              </div>
              <ul className="header__search-history-list">
                <li className="header__search-history-item">
                  <a href="">Kem trị mụn</a>
                </li>
                <li className="header__search-history-item">
                  <a href="">Sữa rửa mặt</a>
                </li>
                <li className="header__search-history-item">
                  <a href="">Kem dưỡng</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="m-1">
            <Button className="h-full px-6" onClick={handleSubmitSearch}>
              <BiSearch size={18} />
            </Button>
          </div>
        </div>
        <div className="header__search-decription hide-on-mobile-tablet">
          <ul className="header__search-decription-list pointer-events-none select-none text-sm"></ul>
        </div>
      </div>
      <div className="header__cart">
        <div onClick={handleCarts} className="header__cart-wrap cursor-pointer">
          <CgShoppingCart size={28} className=" text-white" />
          <span className="header__cart-length  pointer-events-none select-none border-none bg-red-500 text-xs text-white">
            {listCarts.length}
          </span>

          <div className="header__cart-list rounded-md">
            <div className="header__cart-list-container header__cart-list--have-items mx-0 cursor-default  overflow-hidden px-[12px]">
              <img
                src="/src/assets/img/no-items.png"
                alt=""
                className="header__cart-list--no-items-img"
              />
              <div className="header__cart-list--no-items-decription">
                Bạn chưa có sản phẩm nào.
              </div>
              <div className="header__cart-list--have-items-header select-none py-4 ">
                <h3 className="header__cart-list--have-items-title text-base">
                  Sản phẩm mới thêm
                </h3>
              </div>
              <div className="header__cart-list--have-items-body max-h-[50vh] overflow-hidden">
                <ul className="header__cart-list--have-items-items">
                  {listCarts.length
                    ? listCarts.map(cart => (
                        <CartPreview key={cart._id} cart={cart} />
                      ))
                    : []}
                </ul>
              </div>
              <div className="header__cart-list--have-items-footer mt-2">
                <Button className="ml-auto" onClick={handleCarts}>
                  Xem giỏ hàng
                </Button>
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchMain
