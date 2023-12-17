import productApi from '@/apis/modules/product.api'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FiPlus } from 'react-icons/fi'
import { useDispatch } from 'react-redux'

import NotFound from './NotFound'
import ProductGrid from './ProductGrid'
import { Button } from './ui/button'

const ProductHint = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [page, setPage] = useState(1)
  const skip = 60

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
          <ProductGrid products={filteredProducts} />

          {filteredProducts.length < products.length && (
            <div className="mt-4 flex items-center justify-center pb-8">
              <Button variant="outline" onClick={onLoadMore}>
                Xem thêm
                <FiPlus size={18} className="ml-1" />
              </Button>
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
