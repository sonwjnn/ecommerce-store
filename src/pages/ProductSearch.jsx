import productApi from '@/apis/modules/product.api'
import BoardBar from '@/components/BoardBar'
import Pagination from '@/components/Pagination'
import ProductGrid from '@/components/ProductGrid'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import { useEffect, useState } from 'react'
import { TbFileSearch } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

const ProductSearch = () => {
  const { keyword } = useParams()
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [payloadProducts, setPayloadProducts] = useState([])
  const [pageLimits, setPageLimits] = useState(1)
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page')
  const skip = 18

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
          const newProducts = response.filter(product =>
            removeVietnameseDiacritics(product.name).includes(
              removeVietnameseDiacritics(keyword)
            )
          )
          setProducts(newProducts)
        }
      }
    }
    getProducts()
  }, [dispatch, keyword])

  useEffect(() => {
    setPayloadProducts([...products].splice(0, skip))

    // set page limits value
    const pageLimits = Math.ceil(products.length / skip)
    setPageLimits(pageLimits)
  }, [products])

  useEffect(() => {
    if (page) setPayloadProducts([...products].splice((page - 1) * skip, skip))
  }, [page])

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
              <ProductGrid products={payloadProducts} />
              {!products.length && (
                <div className="flex h-[50vh] w-full items-center justify-center ">
                  <div className="flex flex-col items-center justify-center gap-8">
                    <TbFileSearch className="text-[150px] text-gray-300" />
                    <div className="gap-4 text-center text-xl">
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
          {pageLimits > 1 && (
            <Pagination
              currentPage={page}
              pageLimits={pageLimits}
              type="search"
              // onPageSelect={onPageSelect}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default ProductSearch
