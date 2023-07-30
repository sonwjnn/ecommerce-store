import { useEffect, useState } from 'react'
import CategoryItem from './CategoryItem'
import categoryApi from '../../apis/modules/category.api'
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice'
import { setCates } from '../../redux/features/cateSlice'
import { useDispatch } from 'react-redux'
const Categoryy = () => {
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()

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
  return (
    <div>
      <div className="p-8 uppercase text-gray-500 text-[18px]">danh mục</div>
      <div className="flex  overflow-x-auto flex-nowrap">
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
    </div>
  )
}

export default Categoryy
