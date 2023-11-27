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

  // Gộp các phần tử thành các cặp
  const catePairs = categories.reduce((acc, cate, index) => {
    if (index % 2 === 0) {
      acc.push([{ name: cate.name, index }])
    } else {
      acc[acc.length - 1].push({ name: cate.name, index })
    }
    return acc
  }, [])

  const scroll = scrollOffset => {
    ref.current.scrollLeft += scrollOffset
  }

  return (
    <div className=" relative">
      <div className="px-8 py-2 pb-4 text-lg uppercase text-gray-500">
        danh mục
      </div>
      <button
        className="absolute bottom-[34%] left-[-25px] z-10 flex h-[50px] w-[50px] items-center justify-center rounded-[50%] bg-white text-lg shadow-md  focus:outline-none"
        onClick={() => scroll(-1000)}
      >
        <IoIosArrowBack className="text-[26px] text-gray-600" />
      </button>
      <div
        className="scrollbar-hide  flex flex-nowrap overflow-auto scroll-smooth "
        ref={ref}
      >
        {categories.length > 0 ? (
          <>
            {catePairs.map((catePair, index) => (
              <div className="flex min-w-[120px] flex-col" key={index}>
                {catePair.map(cate => (
                  <CategoryItem
                    key={cate.index}
                    index={cate.index}
                    cateName={cate.name}
                    // disable={disableCategories.includes(cate.name)}
                  />
                ))}
              </div>
            ))}
          </>
        ) : (
          <div className="flex h-[300px]  w-full items-center justify-center">
            <NotFound className="h-fit" text={'Không có danh mục nào'} />
          </div>
        )}
      </div>
      <button
        className="absolute bottom-[34%] right-[-25px] z-10 flex h-[50px] w-[50px] items-center justify-center rounded-[50%] bg-white shadow-md focus:outline-none"
        onClick={() => scroll(1000)}
      >
        <IoIosArrowForward className="text-[26px] text-gray-600" />
      </button>
    </div>
  )
}

export default Categoryy
