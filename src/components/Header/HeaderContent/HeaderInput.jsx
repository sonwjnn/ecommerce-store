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
  )
}

export default HeaderInput
