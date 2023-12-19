import categoryApi from '@/apis/modules/category.api'
import { setCates } from '@/redux/features/cateSlice'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import CategoryItem from './CategoryItem'
import { Skeleton } from './ui/skeleton'

const Categoryy = () => {
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
    <div className="relative w-[230px] p-2">
      <div className="border-b border-b-gray-200  px-4 py-3 text-xl text-[#020817]">
        Danh mục
      </div>

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

export default Categoryy
