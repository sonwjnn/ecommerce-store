import { IoMdArrowBack } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'

import HeaderCart from './HeaderCart'
import HeaderInput from './HeaderInput'
import HeaderLogo from './HeaderLogo'

const HeaderContent = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const goBackPage = () => {
    navigate(-1)
  }
  return (
    <div className="header-with-search">
      <HeaderLogo />
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
      <HeaderInput />

      <HeaderCart />
    </div>
  )
}

export default HeaderContent
