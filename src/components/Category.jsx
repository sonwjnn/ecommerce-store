import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import categoryApi from '../apis/modules/category.api'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'

const Category = ({ productCategory }) => {
  const dispatch = useDispatch()

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const { response, err } = await categoryApi.getList()
      if (response.kq) setCategories(response.data)
      if (response.msg) toast.error(response.msg)
      dispatch(setGlobalLoading(false))
    }

    getCategories()
  }, [productCategory, dispatch])
  return (
    <>
      <nav className="category">
        <header className="category__heading">DANH MỤC</header>
        <ul className="category-list">
          {categories.map((cate, index) => (
            <li className="category-item" key={cate._id}>
              <a href="#" className="category-item__link">
                {cate.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Category
