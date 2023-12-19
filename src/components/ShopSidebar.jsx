import typeApi from '@/apis/modules/type.api'
import { cn } from '@/lib/utils'
import { setProductLoading } from '@/redux/features/productLoading'
import { setTypes } from '@/redux/features/typeSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BiCategory } from 'react-icons/bi'
import { LuFilter } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import ProductLoading from './ProductLoading'
import StarVote from './StarVote'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

const ShopSidebar = () => {
  const { shopId, shopCollection } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [productTypes, setProductTypes] = useState([])
  const [activeLink, setActiveLink] = useState(null)
  const [rating, setRating] = useState(3)

  useEffect(() => {
    const getProductTypes = async () => {
      dispatch(setProductLoading(true))
      const { response, err } = await typeApi.getTypesByShopId({ shopId })
      dispatch(setProductLoading(false))
      if (err) toast.error(err.message)
      if (response) {
        setProductTypes(response)
      }
    }

    getProductTypes()
  }, [dispatch])

  useEffect(() => {
    dispatch(setTypes(productTypes))
  }, [productTypes])

  return (
    <>
      <nav className="category  w-[230px] rounded-md">
        <header className="category__heading pointer-events-none flex select-none items-center text-base font-medium ">
          <BiCategory className="mr-2 text-lg" />
          Loại sản phẩm
        </header>
        <ul className="category-list relative p-2">
          {productTypes.length && (
            <li className="category-item select-none">
              <Link
                to={`/shops/${shopId}/all`}
                className={cn(
                  `category-item__link rounded-md text-sm transition  hover:bg-gray-100 active:bg-gray-200`,
                  (activeLink === 0 || shopCollection === 'all') &&
                    'bg-gray-100/75'
                )}
                onClick={() => setActiveLink(0)}
              >
                Tất cả sản phẩm
              </Link>
            </li>
          )}
          {productTypes.length ? (
            productTypes.map((type, index) => (
              <li className="category-item select-none" key={type._id}>
                <Link
                  to={`/shops/${shopId}/${type.slug}`}
                  className={cn(
                    `category-item__link rounded-md text-sm transition hover:bg-gray-100 active:bg-gray-200`,
                    (activeLink === index + 1 ||
                      shopCollection === type.slug) &&
                      'bg-gray-100/75'
                  )}
                  onClick={() => setActiveLink(index + 1)}
                >
                  {type.name}
                </Link>
              </li>
            ))
          ) : (
            <div className="flex flex-col gap-y-2 p-2">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/shops/${undefined}/${undefined}`)}
                    className="w-full cursor-pointer"
                  >
                    <Skeleton className="h-[32px] w-full" />
                  </div>
                ))}
            </div>
          )}
        </ul>

        <header className="category__heading pointer-events-none flex select-none items-center text-base font-medium ">
          <LuFilter className="mr-2 text-lg" />
          Lọc sản phẩm
        </header>
        <div className="px-3 py-2">
          <h2 className="mb-2 text-sm font-medium">Nơi bán</h2>
          {/* Replace with your actual seller options */}
          <div className="flex gap-x-2 text-sm">
            <input
              type="checkbox"
              id="seller1"
              name="seller1"
              value="seller1"
            />
            <label htmlFor="seller1">TP. Hồ Chí Minh</label>
          </div>
          <div className="flex gap-x-2 text-sm">
            <input
              type="checkbox"
              id="seller2"
              name="seller2"
              value="seller2"
            />
            <label htmlFor="seller2">Hà Nội</label>
          </div>
          <div className="flex gap-x-2 text-sm">
            <input
              type="checkbox"
              id="seller2"
              name="seller2"
              value="seller2"
            />
            <label htmlFor="seller2">Hải Phòng</label>
          </div>

          <h2 className="mb-2 mt-4 text-sm font-medium">Đánh giá</h2>
          <div className="flex gap-4">
            <StarVote rating={rating} setRating={setRating} />
            <div className="text-sm text-gray-500">{rating}/5</div>
          </div>

          <h2 className="mb-2 mt-4 text-sm font-medium">Gía sản phẩm</h2>
          <input type="range" min="0" max="10000" />

          <Button variant="outline" className="mt-4 w-full">
            Lọc
          </Button>
        </div>
      </nav>
    </>
  )
}

export default ShopSidebar
