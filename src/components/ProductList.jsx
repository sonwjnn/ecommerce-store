import productApi from '@/apis/modules/product.api'
import { filterTypeOrder } from '@/utilities/filters'
import { mapOrder } from '@/utilities/sorts'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import BoardBar from './BoardBar'
import Pagination from './Pagination'
import ProductGrid from './ProductGrid'

const ProductList = ({ type = 'product' }) => {
  const dispatch = useDispatch()
  const { cateSlug, shopId, typeSlug } = useParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [payloadProducts, setPayloadProducts] = useState([])
  const [priceOption, setPriceOption] = useState('')
  const [pageLimits, setPageLimits] = useState(1)
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page')
  const skip = 15

  useEffect(() => {
    const getProducts = async () => {
      const { response, err } = await productApi.getProductsOfCateBySlug({
        cateSlug,
      })

      if (err) toast.error(err.message)
      if (response) {
        setProducts(response)
      }
    }

    const getProductsByShopId = async () => {
      const { response, err } = await productApi.getProductsByShopId({ shopId })

      if (err) toast.error(err.message)
      if (response) {
        setProducts(response)
      }
    }
    if (type === 'shop') {
      getProductsByShopId()
    } else {
      getProducts()
    }
  }, [dispatch])

  useEffect(() => {
    if (!typeSlug) {
      setFilteredProducts(products)
    } else {
      const newFilteredProducts = filterTypeOrder(products, typeSlug, 'typeId')
      setFilteredProducts(newFilteredProducts)
    }
  }, [typeSlug, products])

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
      <BoardBar handleSelectPriceOption={handleSelectPriceOption} />
      <ProductGrid products={payloadProducts} />
      {pageLimits > 1 && (
        <Pagination
          currentPage={page}
          pageLimits={pageLimits}
          // onPageSelect={onPageSelect}
          type={type}
        />
      )}
    </>
  )
}

export default ProductList
