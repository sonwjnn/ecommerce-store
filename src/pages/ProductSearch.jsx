import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import BoardBar from '../components/BoardBar'
import Pagination from '../components/Pagination'
import ProductItem from '../components/ProductItem'
import Category from '../components/Category'
import productApi from '../apis/modules/product.api'
import { useDispatch } from 'react-redux'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'

const ProductSearch = () => {
  const { keyword } = useParams()
  const dispatch = useDispatch()
  const [onSearch, setOnSearch] = useState(false)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  // const search = useCallback(async () => {
  //   setOnSearch(true)

  //   const { response, err } = await productApi.search({
  //     query,
  //     page
  //   })
  //   setOnSearch(false)

  //   if (err) toast.error(err.message)
  //   if (response) {
  //     if (page > 1) setProducts(m => [...m, ...response.results])
  //     else setProducts([...response.results])
  //   }
  // }, [query, page])

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await productApi.getList()
      dispatch(setGlobalLoading(false))

      if (response) {
        if (keyword.trim().length === 0) {
          setProducts([])
          setPage(1)
        } else
          setProducts(
            response.msg.filter(product =>
              removeVietnameseDiacritics(product.name).includes(
                removeVietnameseDiacritics(keyword)
              )
            )
          )
      }
      // if (response.msg) toast.error(response.msg)
    }
    getProducts()
  }, [dispatch, keyword])

  const removeVietnameseDiacritics = str => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  const handleSortPriceUpDown = () => {
    const newProducts = [...products].sort((a, b) => +b.price - +a.price)
    setProducts(newProducts)
  }

  const handleSortPriceDownUp = () => {
    const newProducts = [...products].sort((a, b) => +a.price - +b.price)
    setProducts(newProducts)
  }

  return (
    <>
      <div className="app__container pt-0">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex sm-gutter pt-0 lg:pt-[36px] app__content">
            <div className="col hidden md:block"></div>

            <div className="col col-span-10 overflow-hidden grow">
              <BoardBar
                handleSortPriceDownUp={handleSortPriceDownUp}
                handleSortPriceUpDown={handleSortPriceUpDown}
              />
              <div className="home-product min-h-screen home-product--spacing-bottom">
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
                      cateName={product.cateName}
                    />
                  ))}
                </div>
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductSearch
