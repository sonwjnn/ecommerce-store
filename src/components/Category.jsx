import categoryApi from '@/apis/modules/category.api'
import { setCates } from '@/redux/features/cateSlice'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useDispatch } from 'react-redux'

import CategoryItem from './CategoryItem'
import NotFound from './NotFound'

const Categoryy = () => {
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()
  const ref = useRef()
  useEffect(() => {
    const getCategories = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await categoryApi.getList()
      dispatch(setGlobalLoading(false))
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

  const scroll = scrollOffset => {
    ref.current.scrollLeft += scrollOffset
  }

  return (
    <div className="relative w-[230px]">
      <div className="px-8 py-3 text-lg  text-[#020817]">Danh mục</div>

      <div
        className="scrollbar-hide flex flex-col-reverse flex-nowrap overflow-auto scroll-smooth px-2 py-3 "
        ref={ref}
      >
        {categories.length > 0 ? (
          <>
            {categories.map((item, index) => (
              <CategoryItem
                key={index}
                index={index}
                cateName={item.name}
                // disable={disableCategories.includes(cate.name)}
              />
            ))}
          </>
        ) : (
          <div className="flex h-[300px]  w-full items-center justify-center">
            <NotFound
              className="h-fit"
              text={'Không có danh mục nào'}
              size={80}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Categoryy
