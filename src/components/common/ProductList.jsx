import { useDispatch } from 'react-redux'
import ProductGrid from './ProductGrid'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice'
import productApi from '../../apis/modules/product.api'
import { toast } from 'react-hot-toast'
import { filterTypeOrder } from '../../utilities/filters'
import BoardBar from './BoardBar'
import Pagination from './Pagination'
import { mapOrder } from '../../utilities/sorts'

const ProductList = () => {
  const dispatch = useDispatch()
  const { typeName, cateName } = useParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [payloadProducts, setPayloadProducts] = useState([])
  const [priceOption, setPriceOption] = useState('')
  const [pageLimits, setPageLimits] = useState(1)
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
    const pageLimits = Math.ceil(filteredProducts.length / skip)
    setPageLimits(pageLimits)
  }, [filteredProducts])

  const handleSelectPriceOption = e => {
    setPriceOption(e.target.innerText)
  }

  const onPageSelect = page => {
    setPayloadProducts([...filteredProducts].splice(page * skip, skip))
  }

  return (
    <>
      <BoardBar handleSelectPriceOption={handleSelectPriceOption} />
      <ProductGrid products={payloadProducts} />
      {pageLimits > 1 && (
        <Pagination
          pageLimits={pageLimits}
          onPageSelect={onPageSelect}
          typeName={typeName}
          cateName={cateName}
        />
      )}
    </>
  )
}

export default ProductList
