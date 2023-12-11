import shopApi from '@/apis/modules/shop.api'
import ShopDetail from '@/components/ShopDetail'
import ShopSidebar from '@/components/ShopSidebar'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

const ShopLayout = () => {
  const dispatch = useDispatch()
  const { shopId } = useParams()
  const [shop, setShop] = useState(null)

  useEffect(() => {
    const getShop = async () => {
      const { response, error } = await shopApi.getDetail({ shopId })
      if (response) {
        setShop(response)
      } else if (error) {
        toast.error(error.message)
      }
    }
    getShop()
  }, [dispatch])

  return (
    <>
      <div className="app__container">
        <div className="mx-auto max-w-[1200px]">
          <ShopDetail shop={shop} />
          <div className="sm-gutter app__content flex pt-0 lg:pt-[36px]">
            <div className="col hidden md:block">
              <ShopSidebar />
            </div>

            <div className="col col-span-10 grow overflow-hidden">
              {/* <ProductList /> */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShopLayout
