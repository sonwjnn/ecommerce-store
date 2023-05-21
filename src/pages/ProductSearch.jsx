import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import BoardBar from '../components/common/BoardBar'
import Pagination from '../components/common/Pagination'
import ProductItem from '../components/common/ProductItem'
import Category from '../components/common/Category'
import productApi from '../apis/modules/product.api'
import { useDispatch } from 'react-redux'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'
import { TbFileSearch } from 'react-icons/tb'

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
              {products.length ? (
                <BoardBar
                  handleSortPriceDownUp={handleSortPriceDownUp}
                  handleSortPriceUpDown={handleSortPriceUpDown}
                />
              ) : null}
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
                  {!products.length && (
                    <div className="h-[50vh] w-full flex items-center justify-center ">
                      <div className="flex flex-col gap-8 items-center justify-center">
                        <TbFileSearch className="text-[150px] text-gray-300" />
                        <div className="gap-4 text-[20px] text-center">
                          <div className="text-gray-600">
                            Không tìm thấy kết quả nào
                          </div>
                          <div className="text-gray-500">
                            {' '}
                            Hãy thử sử dụng các từ khóa chung chung hơn
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {products.length ? <Pagination /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductSearch
