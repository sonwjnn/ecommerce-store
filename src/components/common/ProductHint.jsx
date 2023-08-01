import { useDispatch } from 'react-redux'
import ProductGrid from './ProductGrid'
import { useEffect, useState } from 'react'
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice'
import productApi from '../../apis/modules/product.api'
import { toast } from 'react-hot-toast'

const ProductHint = () => {
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setGlobalLoading(true))
      // dispatch(clearProductsStore())
      const { response, err } = await productApi.getList()
      dispatch(setGlobalLoading(false))

      if (err) toast.error(err.message)
      if (response) {
        setProducts(response)
      }
    }
    getProducts()
  }, [dispatch])

  return (
    <div>
      <ProductGrid products={products} />
    </div>
  )
}

export default ProductHint
