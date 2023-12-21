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
    <div className="relative mx-auto flex h-[110px] max-w-[1280px] flex-col items-center  bg-white  pb-2 md:h-[70px] md:flex-row md:pb-0">
      <HeaderLogo className={'md:hidden'} />
      <div className="flex w-full items-center justify-around gap-x-3">
        <HeaderLogo className={'hidden md:block'} />
        <div
          className={`ml-2 flex items-center justify-start md:hidden ${
            location.pathname === '/' ? 'hidden' : 'block'
          }`}
          onClick={goBackPage}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent  p-2 ">
            <IoMdArrowBack size={24} className="text-primary" />
          </div>
        </div>

        <HeaderInput />

        <HeaderCart />
      </div>
    </div>
  )
}

export default HeaderContent
