import ProductItem from './ProductItem'
import productApi from '../apis/modules/product.api'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'
import { toast } from 'react-toastify'
import { productType } from '../routes/routes'
import { useLocation } from 'react-router-dom'
import { cloneDeep } from 'lodash'
const ProductList = ({ productType }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [products, setProducts] = useState([])
  useEffect(() => {
    const getProducts = async () => {
      const { response, err } = await productApi.getList()
      if (response.kq) setProducts(response.msg)
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
  }, [location])

  useEffect(() => {
    let cloneProduct = cloneDeep(products)

    let cateFilter = document.querySelector('.category-item__link.active')

    cloneProduct.filter(
      (item, index) => item.cateName === cateFilter.textContent
    )
  }, [location])

  return (
    <div className="home-product home-product--spacing-bottom">
      <div className="row sm-gutter">
        {/* <!-- Product item --> */}
        {cloneProduct.map((product, index) => (
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
