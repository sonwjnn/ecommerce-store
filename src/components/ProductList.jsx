import ProductItem from './ProductItem'
import productApi from '../apis/modules/product.api'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import { setProductsStore } from '../redux/features/productSlice'
const ProductList = () => {
  const dispatch = useDispatch()
  const { productType } = useParams()
  const { productsStore } = useSelector(state => state.products)

  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const { response, err } = await productApi.getList()
      if (response.kq) {
        setProducts(response.msg)
      }
      // if (response.msg) toast.error(response.msg)
    }

    getProducts()
  }, [dispatch])

  useEffect(() => {
    let cates = document.querySelectorAll('.category-item__link')
    cates = Array.from(cates)
    cates.forEach(cate => {
      cate.addEventListener('click', () => {
        cates.forEach(cate => {
          if (cate.classList.contains('active')) {
            cate.classList.remove('active')
          }
        })
        cate.classList.toggle('active')
      })
    })
  }, [productType])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (products.length) {
      dispatch(
        setProductsStore(
          cloneDeep(products).filter(
            (item, index) => item.cateName === productType
          )
        )
      )
    }
  }, [dispatch, productType])

  return (
    <div className="home-product home-product--spacing-bottom">
      <div className="row sm-gutter">
        {/* <!-- Product item --> */}
        {(productsStore.length ? productsStore : products).map(
          (product, index) => (
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
          )
        )}
      </div>
    </div>
  )
}

export default ProductList
