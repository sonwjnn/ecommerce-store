import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import categoryApi from '../apis/modules/category.api'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'
import { toast } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'
import { productType } from '../routes/routes'
import { BiCategory } from 'react-icons/bi'
import { setCates } from '../redux/features/cateSlice'

const Category = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [activeLink, setActiveLink] = useState(null)
  const { cates } = useSelector(state => state.cates)

  useEffect(() => {
    const getCategories = async () => {
      const { response, err } = await categoryApi.getList()

      if (response.kq) {
        setCategories(response.data)
      }
    }

    getCategories()
  }, [productType, dispatch])

  useEffect(() => {
    dispatch(setCates(categories))
  }, [categories])

  return (
    <>
      <nav className="category  w-[200px]">
        <header className="category__heading pointer-events-none select-none flex items-center">
          <BiCategory className="text-[18px] mr-2" />
          DANH MỤC
        </header>
        <ul className="category-list">
          {categories.map((cate, index) => (
            <li className="category-item select-none" key={cate._id}>
              <Link
                to={`/products/${productType[index]}`}
                className={`category-item__link ${
                  activeLink === index ? 'active' : ''
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
