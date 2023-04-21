import ProductItem from './ProductItem'
import productApi from '../apis/modules/product.api'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProductLoading } from '../redux/features/productLoading'
import { toast } from 'react-toastify'
import { useParams, useLocation } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import { setProductsStore } from '../redux/features/productSlice'
const ProductList = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { productType } = useParams()
  const { productsStore } = useSelector(state => state.products)

  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setProductLoading(true))
      const { response, err } = await productApi.getList()
      dispatch(setProductLoading(false))

      if (response.kq) {
        setProducts(response.msg)
      }
      // if (response.msg) toast.error(response.msg)
    }

    getProducts()
  }, [dispatch])

  useEffect(() => {
    if (products.length) {
      dispatch(
        setProductsStore(
          products.filter((item, index) => item.cateName === productType)
        )
      )
    }
  }, [dispatch, productType, products])

  const handleProductsRender = () => {
    if (location.pathname === '/') {
      let cates = document.querySelectorAll('.category-item__link')
      cates = Array.from(cates)
      cates.forEach(cate => {
        if (cate.classList.contains('active')) {
          cate.classList.remove('active')
        }
      })
      return products
    } else {
      return productsStore.length ? productsStore : products
    }
  }

  return (
    <div className="home-product home-product--spacing-bottom">
      <div className="row sm-gutter">
        {/* <!-- Product item --> */}
        {handleProductsRender().map((product, index) => (
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.name}
            price={product.price}
            imageName={product.imageName}
            info={product.info}
            date={product.dateOfM}
            origin={product.origin}
            cateName={product.cateName}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList
