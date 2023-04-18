import ProductItem from './ProductItem'
import productApi from '../apis/modules/product.api'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'
import { toast } from 'react-toastify'
const ProductList = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const { response, err } = await productApi.getList()
      if (response.kq) setProducts(response.msg)
      // if (response.msg) toast.error(response.msg)
    }

    getProducts()
  }, [dispatch])
  return (
    <div className="home-product home-product--spacing-bottom">
      <div className="row sm-gutter">
        {/* <!-- Product item --> */}
        {products.map((product, index) => (
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.name}
            price={product.price}
            imageName={product.imageName}
            info={product.info}
            date={product.dateOfM}
            origin={product.origin}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList
