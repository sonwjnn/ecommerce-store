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
    <div className="header-with-search mx-auto max-w-[1200px] bg-white px-6">
      <HeaderLogo />
      <div
        className={`back mr-2 flex items-center justify-start md:hidden ${
          location.pathname === '/' ? 'hidden' : 'block'
        }`}
        onClick={goBackPage}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl  bg-accent p-2">
          <IoMdArrowBack size={24} className=" text-primary" />
        </div>
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
