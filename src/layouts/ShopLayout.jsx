import shopApi from '@/apis/modules/shop.api'
import ShopDetail from '@/components/ShopDetail'
import ShopSidebar from '@/components/ShopSidebar'
import Container from '@/components/ui/container'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

const ShopLayout = () => {
  const dispatch = useDispatch()
  const { shopId } = useParams()
  const [shop, setShop] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
    <Container>
      <ShopDetail shop={shop} />
      <div className="flex gap-4 pt-0 lg:pt-[36px]">
        <div className="hidden md:block">
          <ShopSidebar />
        </div>

        <div className="grow overflow-hidden">
          {/* <ProductList /> */}
          <Outlet />
        </div>
      </div>
    </Container>
  )
}

export default ShopLayout
