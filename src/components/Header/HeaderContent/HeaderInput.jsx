import { useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { LuSearch } from 'react-icons/lu'
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
    <div className="flex w-full max-w-[800px]">
      <form onSubmit={handleSubmitSearch} className="relative h-full w-full">
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
  )
}

export default HeaderInput
