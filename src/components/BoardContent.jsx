import productApi from '@/apis/modules/product.api'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import BoardBar from './BoardBar'
import Pagination from './Pagination'
import ProductList from './ProductGrid'
import ProductSidebar from './ProductSidebar'

const BoardContent = () => {
  const { typeName, cateName } = useParams()
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await productApi.getProductsOfCate({ cateName })

      dispatch(setGlobalLoading(false))

      if (err) toast.error(err.message)
      if (response) {
        setProducts(response)
      }
    }

    getProducts()
  }, [dispatch])

  return (
    <div className="app__container">
      <div className="wide">
        <div className="row sm-gutter app__content w-full">
          <div className="col l-2 c-0 m-0">
            <ProductSidebar />
          </div>

          <div className="col l-10 c-12">
            <BoardBar />

            <ProductList products={products} productType={typeName} />

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardContent
