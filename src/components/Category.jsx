import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import categoryApi from '../apis/modules/category.api'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'
import { toast } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'
import { productType as productTypes } from '../routes/routes'
import { BiCategory } from 'react-icons/bi'
import { setCates } from '../redux/features/cateSlice'
import { setProductLoading } from '../redux/features/productLoading'
import ProductLoading from './common/ProductLoading'

const Category = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [activeLink, setActiveLink] = useState(null)
  const { cates } = useSelector(state => state.cates)
  const { productType } = useParams()
  useEffect(() => {
    const getCategories = async () => {
      dispatch(setProductLoading(true))
      const { response, err } = await categoryApi.getList()
      dispatch(setProductLoading(false))

      if (response.kq) {
        setCategories(response.data)
      }
    }

    getCategories()
  }, [productTypes, dispatch])

  useEffect(() => {
    dispatch(setCates(categories))
  }, [categories])

  return (
    <>
      <nav className="category  w-[200px]">
        <header className="category__heading pointer-events-none select-none flex uppercase items-center">
          <BiCategory className="text-[18px] mr-2" />
          loại sản phẩm
        </header>
        <ul className="category-list relative">
          <ProductLoading className="absolute top-0 right-0 left-0 bottom-0" />
          {categories.map((cate, index) => (
            <li className="category-item select-none" key={cate._id}>
              <Link
                to={`/products/${productTypes[index]}`}
                className={`category-item__link ${
                  activeLink === index && productType ? 'active' : ''
                }`}
                onClick={() => setActiveLink(index)}
              >
                {cate.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Category
