import productApi from '@/apis/modules/product.api'
import productConfigs from '@/configs/product.configs'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import { clearProductsStore } from '@/redux/features/productSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

import BoardBar from './BoardBar'
import Pagination from './Pagination'
import ProductList from './ProductGrid'
import ProductSidebar from './ProductSidebar'

const BoardContent = () => {
  const { typeName, cateName } = useParams()
  console.log(typeName, cateName)
  const dispatch = useDispatch()
  const location = useLocation()
  // const { productsStore, productsSortPrice } = useSelector(
  //   state => state.products
  // )
  const [products, setProducts] = useState([])
  const [productsSort, setProductsSort] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setGlobalLoading(true))
      // dispatch(clearProductsStore())
      const { response, err } = await productApi.getProductsOfCate({ cateName })

      dispatch(setGlobalLoading(false))

      if (err) toast.error(err.message)
      if (response) {
        setProducts(response)
      }
    }

    getProducts()
  }, [dispatch])

  // useEffect(() => {
  //   if (products.length) {
  //     dispatch(
  //       setProductsStore(products.filter(item => item.type === typeName))
  //     )
  //     setProductsSort(products)
  //   }
  // }, [dispatch, typeName, products])

  // useEffect(() => {
  //   if (productsSortPrice) {
  //     if (productsStore.length) {
  //       dispatch(
  //         setProductsStore(
  //           productsSortPrice === 'upToDown'
  //             ? [...productsStore].sort((a, b) => +b.price - +a.price)
  //             : [...productsStore].sort((a, b) => +a.price - +b.price)
  //         )
  //       )
  //     } else {
  //       setProductsSort(
  //         productsSortPrice === 'upToDown'
  //           ? [...products].sort((a, b) => +b.price - +a.price)
  //           : [...products].sort((a, b) => +a.price - +b.price)
  //       )
  //     }
  //   }
  // }, [productsSortPrice])

  // useEffect(() => {
  //   dispatch(setProductsSortPrice(null))
  // }, [location])

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
