import { useDispatch } from 'react-redux'
import ProductHintGrid from './ProductHintGrid'
import { useEffect, useState } from 'react'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import productApi from '@/apis/modules/product.api'
import { toast } from 'react-hot-toast'

const ProductHint = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [page, setPage] = useState(1)
  const skip = 12

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await productApi.getList()
      dispatch(setGlobalLoading(false))

      if (err) toast.error(err.message)
      if (response) {
        setProducts([...response])
        setFilteredProducts([...response.splice(0, skip)])
      }
    }
    getProducts()
  }, [dispatch])

  const onLoadMore = () => {
    setFilteredProducts([
      ...filteredProducts,
      ...[...products].splice(page * skip, skip)
    ])
    setPage(page + 1)
  }

  return (
    <>
      <ProductHintGrid products={filteredProducts} />

      {filteredProducts.length < products.length && (
        <div className="flex items-center justify-center pb-8">
          <button
            className="px-8 py-2 mt-2 capitalize text-[14px] hover:bg-gray-100 border border-gray-300 bg-white outline-none"
            onClick={onLoadMore}
          >
            xem thêm
          </button>
        </div>
      )}
    </>
  )
}

export default ProductHint
