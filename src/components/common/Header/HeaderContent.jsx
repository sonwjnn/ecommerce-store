import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdArrowBack } from 'react-icons/io'
import { LuSearch } from 'react-icons/lu'
import { LuShoppingBag } from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const HeaderContent = () => {
  const { user, listCarts } = useSelector(state => state.user)
  const location = useLocation()
  const navigate = useNavigate()
  const goBackPage = () => {
    navigate(-1)
  }

  const searchInput = useRef()
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (!location.pathname.includes('search')) {
      setKeyword('')
    }
  }, [location])

  const handleSubmitSearch = e => {
    e.preventDefault()
    keyword.trim()
      ? navigate(`/search/${encodeURIComponent(keyword)}`)
      : searchInput.current?.focus()
  }

  const handleCarts = () => {
    if (user) {
      navigate('/user/carts')
    } else {
      toast.error('You must login first!', { toastId: 'warning-login' })
      navigate('/auth/signin')
    }
  }
  return (
    <div className="relative mx-auto flex h-[110px] max-w-[1280px] flex-col items-center  bg-white  pb-2 md:h-[70px] md:flex-row md:pb-0">
      <div className={'flex h-full w-[200px] p-2 md:hidden'}>
        <Link to="/" className="block h-full w-full">
          <div
            className=" mx-auto h-[50px] w-[150px] bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(/images/logos/logo_header_2.svg)`,
            }}
          ></div>
        </Link>
      </div>
      <div className="flex w-full items-center justify-around gap-x-3">
        <div className={'flex h-full w-[200px] p-2 md:block'}>
          <Link to="/" className="block h-full w-full">
            <div
              className=" mx-auto h-[50px] w-[150px] bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(/images/logos/logo_header_2.svg)`,
              }}
            ></div>
          </Link>
        </div>
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

        <div className="w-full max-w-[800px]">
          <form
            onSubmit={handleSubmitSearch}
            className="relative h-full w-full"
          >
            <Input
              type="text"
              className="relative rounded-l-md bg-accent px-4 pl-8"
              placeholder="Nhập sản phẩm để tìm kiếm"
              value={keyword}
              ref={searchInput}
              onChange={event => setKeyword(event.target.value)}
            />
            <LuSearch className="absolute left-2.5 top-[30%] text-muted-foreground" />
          </form>
        </div>

        <div className="flex w-[80px] items-center justify-center ">
          <div
            onClick={handleCarts}
            className=" group relative flex cursor-pointer items-center"
          >
            <LuShoppingBag
              size={26}
              className=" text-primary group-hover:opacity-70"
            />
            <span className="pointer-events-none  absolute right-[-8px] top-[-8px] flex h-5 w-5 select-none items-center justify-center  rounded-full  bg-secondary  text-xs font-medium text-white">
              {listCarts.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderContent
