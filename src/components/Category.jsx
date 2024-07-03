import categoryApi from '@/services/api/modules/category.api'
import { setCates } from '@/services/redux/features/cateSlice'
import { cn } from '@/utils/helpers'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import CategoryItem from './CategoryItem'
import { Separator } from './ui/seperator'
import { Skeleton } from './ui/skeleton'

const Category = ({ className }) => {
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef()
  useEffect(() => {
    const getCategories = async () => {
      const { response, err } = await categoryApi.getList()
      if (err) toast.error(err.message)
      if (response) {
        setCategories(response)
      }
    }
    getCategories()
  }, [dispatch])

  useEffect(() => {
    dispatch(setCates(categories))
  }, [categories])

  return (
    <div className={cn('relative w-[230px] p-2', className)}>
      <div className="px-4 py-3 text-xl font-medium text-[#020817]">
        Danh mục
      </div>
      <Separator />

      <div
        className="scrollbar-hide flex flex-col-reverse flex-nowrap overflow-auto scroll-smooth  py-3 "
        ref={ref}
      >
        {categories.length ? (
          <>
            {categories.map((item, index) => (
              <CategoryItem key={index} index={index} cate={item} />
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-y-2">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  onClick={() =>
                    navigate(`/products/${undefined}/${undefined}`)
                  }
                  className="w-full cursor-pointer"
                >
                  <Skeleton className="h-[50px] w-full" />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Category
