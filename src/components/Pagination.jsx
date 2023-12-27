import { cn } from '@/utils/helpers'
import { useEffect, useState } from 'react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { Button } from './ui/button'

const Pagination = props => {
  const { pageLimits, currentPage, typeName, cateName, type } = props
  const { shopId } = useParams()
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState(0)

  useEffect(() => {
    if (currentPage) setActivePage(currentPage - 1)
  }, [currentPage])

  const pageNumbers = Array.from(
    { length: pageLimits },
    (_, index) => index + 1
  )

  const handleNavigate = number => {
    if (type === 'shop') {
      if (!typeName) {
        return `/shops/${shopId}/all?page=${number}`
      }
      return `/shops/${shopId}/${typeName}?page=${number}`
    } else if (type === 'product') {
      if (!typeName) {
        return `/products/${cateName}/all?page=${number}`
      }
      return `/products/${cateName}/${typeName}?page=${number}`
    } else {
      return `${pathname}?page=${number}`
    }
  }

  const handlePrev = () => {
    if (activePage > 0) {
      navigate(handleNavigate(activePage))
    }
  }

  const handleNext = () => {
    if (activePage < pageLimits - 1) {
      navigate(handleNavigate(activePage + 2))
    }
  }
  return (
    <div className="mt-12">
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-lg hover:bg-gray-900/10"
          onClick={handlePrev}
          disable={activePage === 0}
        >
          <LuArrowLeft strokeWidth={2} className="h-4 w-4" /> Trước
        </Button>
        {pageNumbers.map((number, index) => (
          <Link key={number} to={handleNavigate(number)}>
            <Button
              size="icon"
              className={cn(
                'rounded-lg',
                activePage !== index && 'hover:bg-gray-900/10'
              )}
              variant={`${activePage === index ? 'default' : 'ghost'}`}
            >
              {number}
            </Button>
          </Link>
        ))}
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-lg hover:bg-gray-900/10"
          onClick={handleNext}
          disable={activePage === pageLimits - 1}
        >
          <LuArrowRight strokeWidth={2} className="h-4 w-4" /> Sau
        </Button>
      </div>
    </div>
  )
}

export default Pagination
