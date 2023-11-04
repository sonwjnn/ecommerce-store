import typeApi from '@/apis/modules/type.api'
import { cn } from '@/lib/utils'
import { setProductLoading } from '@/redux/features/productLoading'
import { setTypes } from '@/redux/features/typeSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BiCategory } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import ProductLoading from './ProductLoading'

const ProductSidebar = () => {
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
      {productTypes.length ? (
        <nav className="category  w-[200px]">
          <header className="category__heading pointer-events-none flex select-none items-center text-base font-bold uppercase">
            <BiCategory className="mr-2 text-[18px]" />
            loại sản phẩm
          </header>
          <ul className="category-list relative">
            <ProductLoading className="absolute bottom-0 left-0 right-0 top-0" />
            {productTypes.map((type, index) => (
              <li className="category-item select-none" key={type._id}>
                <Link
                  to={`/products/${cateName}/${type.name}`}
                  className={cn(
                    `category-item__link  text-sm`,
                    (activeLink === index || typeName === type.name) && 'active'
                  )}
                  onClick={() => setActiveLink(index)}
                >
                  {type.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  )
}

export default ProductSidebar
