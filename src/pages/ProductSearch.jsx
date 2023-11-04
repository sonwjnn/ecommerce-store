import productApi from '@/apis/modules/product.api'
import BoardBar from '@/components/BoardBar'
import Pagination from '@/components/Pagination'
import ProductHintGrid from '@/components/ProductHintGrid'
import ProductItem from '@/components/ProductItem'
import Category from '@/components/ProductSidebar'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import { useCallback, useEffect, useState } from 'react'
import { TbFileSearch } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

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
        } else {
          setProducts(
            response.filter(product =>
              removeVietnameseDiacritics(product.name).includes(
                removeVietnameseDiacritics(keyword)
              )
            )
          )
        }
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

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <>
      <div className="app__container pt-0">
        <div className="mx-auto max-w-[1200px]">
          <div className="sm-gutter app__content flex pt-0 lg:pt-[36px]">
            <div className="col hidden md:block"></div>

            <div className="col col-span-10 grow overflow-hidden">
              {products.length ? (
                <BoardBar
                  handleSortPriceDownUp={handleSortPriceDownUp}
                  handleSortPriceUpDown={handleSortPriceUpDown}
                />
              ) : null}
              <ProductHintGrid products={products} />
              {!products.length && (
                <div className="flex h-[50vh] w-full items-center justify-center ">
                  <div className="flex flex-col items-center justify-center gap-8">
                    <TbFileSearch className="text-[150px] text-gray-300" />
                    <div className="gap-4 text-center text-[20px]">
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
    </>
  )
}

export default ProductSearch
