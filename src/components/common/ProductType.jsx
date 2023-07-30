import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import typeApi from '../../apis/modules/type.api'
import { Link, useParams } from 'react-router-dom'
import { BiCategory } from 'react-icons/bi'
import { setTypes } from '../../redux/features/typeSlice'
import { setProductLoading } from '../../redux/features/productLoading'
import ProductLoading from './ProductLoading'
import { toast } from 'react-hot-toast'

const ProductType = () => {
  const { cateName, typeName } = useParams()
  const dispatch = useDispatch()
  const [productTypes, setProductTypes] = useState([])
  const [activeLink, setActiveLink] = useState(null)
  useEffect(() => {
    const getProductTypes = async () => {
      dispatch(setProductLoading(true))
      const { response, err } = await typeApi.getTypesOfCate({ cateName })
      dispatch(setProductLoading(false))
      if (err) toast.error(err.message)
      if (response) {
        setProductTypes(response)
      }
    }

    getProductTypes()
  }, [dispatch])

  useEffect(() => {
    dispatch(setTypes(productTypes))
  }, [productTypes])

  return (
    <>
      <nav className="category  w-[200px]">
        <header className="category__heading pointer-events-none select-none flex uppercase items-center">
          <BiCategory className="text-[18px] mr-2" />
          loại sản phẩm
        </header>
        <ul className="category-list relative">
          <ProductLoading className="absolute top-0 right-0 left-0 bottom-0" />
          {productTypes.map((cate, index) => (
            <li className="category-item select-none" key={cate._id}>
              <Link
                to={`/products/${cateName}/${productTypes[index]}`}
                className={`category-item__link ${
                  activeLink === index || typeName === cate.name ? 'active' : ''
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

export default ProductType
