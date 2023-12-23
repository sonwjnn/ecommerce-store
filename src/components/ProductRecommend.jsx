import productApi from '@/apis/modules/product.api'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import ProductGrid from './ProductGrid'
import { Button } from './ui/button'

const ProductRecommend = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [page, setPage] = useState(1)
  const skip = 20

  useEffect(() => {
    const getProducts = async () => {
      const { response, err } = await productApi.getList()

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
      <ProductGrid products={filteredProducts} />

      {filteredProducts.length < products.length && (
        <div className="mt-4 flex items-center justify-center pb-8">
          <Button className="px-12 py-4" variant="outline" onClick={onLoadMore}>
            Xem thêm
          </Button>
        </div>
      )}
    </>
  )
}

export default ProductRecommend
