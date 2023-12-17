import { useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '../../ui/button'
import { Input } from '../../ui/input'

const HeaderInput = () => {
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

  return (
    <div className="flex flex-1">
      <div className="header__search w-full ">
        <div className="header__search-input-wrap ">
          <form onSubmit={handleSubmitSearch} className="relative h-full">
            <Input
              type="text"
              className="h-full rounded-l-md  border-none bg-accent px-4 focus-visible:ring-0"
              placeholder="Nhập sản phẩm để tìm kiếm"
              value={keyword}
              ref={searchInput}
              onChange={event => setKeyword(event.target.value)}
            />
          </form>
        </div>
        {/* <Button
          className="h-full rounded-r-md bg-accent px-6 text-muted-foreground hover:bg-accent"
          onClick={handleSubmitSearch}
        >
          <BiSearch size={18} />
        </Button> */}
      </div>
      <div className="header__search-decription hide-on-mobile-tablet">
        <ul className="header__search-decription-list pointer-events-none select-none text-sm"></ul>
      </div>
    </div>
  )
}

export default HeaderInput
