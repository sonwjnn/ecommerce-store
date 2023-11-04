import productApi from '@/apis/modules/product.api'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import { filterTypeOrder } from '@/utilities/filters'
import { mapOrder } from '@/utilities/sorts'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import BoardBar from './BoardBar'
import Pagination from './Pagination'
import ProductGrid from './ProductGrid'
import ProductNotFound from './ProductNotFound'

const ProductList = () => {
  const dispatch = useDispatch()
  const { typeName, cateName } = useParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [payloadProducts, setPayloadProducts] = useState([])
  const [priceOption, setPriceOption] = useState('')
  const [pageLimits, setPageLimits] = useState(1)
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page')
  const skip = 10

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

  useEffect(() => {
    if (typeName === 'Tất cả sản phẩm') {
      setFilteredProducts(products)
    } else {
      const newFilteredProducts = filterTypeOrder(products, typeName, 'typeId')
      setFilteredProducts(newFilteredProducts)
    }
  }, [typeName, products])

  useEffect(() => {
    if (priceOption === 'Thấp đến cao') {
      const newFilteredProducts = mapOrder(
        [...filteredProducts],
        null,
        'discountPrice'
      )
      setFilteredProducts(newFilteredProducts)
    } else if (priceOption === 'Cao đến thấp') {
      const newFilteredProducts = mapOrder(
        [...filteredProducts],
        'dec',
        'discountPrice'
      )
      setFilteredProducts(newFilteredProducts)
    }
  }, [priceOption])

  useEffect(() => {
    setPayloadProducts([...filteredProducts].splice(0, skip))

    // set page limits value
    const pageLimits = Math.ceil(filteredProducts.length / skip)
    setPageLimits(pageLimits)
  }, [filteredProducts])

  useEffect(() => {
    if (page)
      setPayloadProducts([...filteredProducts].splice((page - 1) * skip, skip))
  }, [page])

  const handleSelectPriceOption = e => {
    setPriceOption(e.target.innerText)
  }

  return (
    <>
      {payloadProducts.length ? (
        <>
          <BoardBar handleSelectPriceOption={handleSelectPriceOption} />
          <ProductGrid products={payloadProducts} />
          {pageLimits > 1 && (
            <Pagination
              currentPage={page}
              pageLimits={pageLimits}
              // onPageSelect={onPageSelect}
              typeName={typeName}
              cateName={cateName}
            />
          )}
        </>
      ) : (
        <ProductNotFound text={'Danh mục hiện tại chưa có sản phẩm nào.'} />
      )}
    </>
  )
}

export default ProductList
