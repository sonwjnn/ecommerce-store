import { useEffect, useRef, useState } from 'react'
import CategoryItem from './CategoryItem'
import categoryApi from '@/apis/modules/category.api'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import { setCates } from '@/redux/features/cateSlice'
import { useDispatch } from 'react-redux'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
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
      <div className="p-8 uppercase text-gray-500 text-[18px]">danh mục</div>
      <button
        className="absolute bottom-[34%] left-[-25px] w-[50px] h-[50px] z-10 bg-white shadow-md rounded-[50%] flex items-center justify-center text-lg  focus:outline-none"
        onClick={() => scroll(-1000)}
      >
        <IoIosArrowBack className="text-[26px] text-gray-600" />
      </button>
      <div
        className="flex  overflow-auto scrollbar-hide flex-nowrap scroll-smooth "
        ref={ref}
      >
        {catePairs.map((catePair, index) => (
          <div className="flex flex-col min-w-[120px]" key={index}>
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
      </div>
      <button
        className="absolute bottom-[34%] right-[-25px] w-[50px] h-[50px] z-10 bg-white shadow-md rounded-[50%] flex items-center justify-center focus:outline-none"
        onClick={() => scroll(1000)}
      >
        <IoIosArrowForward className="text-[26px] text-gray-600" />
      </button>
    </div>
  )
}

export default Categoryy
