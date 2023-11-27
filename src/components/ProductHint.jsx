import productApi from '@/apis/modules/product.api'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import NotFound from './NotFound'
import ProductHintGrid from './ProductHintGrid'

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
      ...[...products].splice(page * skip, skip),
    ])
    setPage(page + 1)
  }

  return (
    <>
      {filteredProducts.length ? (
        <>
          <ProductHintGrid products={filteredProducts} />

          {filteredProducts.length < products.length && (
            <div className="flex items-center justify-center pb-8">
              <button
                className="mt-2 border border-gray-300 bg-white px-8 py-2 text-sm capitalize outline-none hover:bg-gray-100"
                onClick={onLoadMore}
              >
                xem thêm
              </button>
            </div>
          )}
        </>
      ) : (
        <NotFound text={'Hiện tại chưa có sản phẩm nào.'} />
      )}
    </>
  )
}

export default ProductHint
