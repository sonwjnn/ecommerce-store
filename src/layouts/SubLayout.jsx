import ProductSidebar from '@/components/ProductSidebar'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const SubLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="mx-auto mt-[150px] max-w-[1280px]">
      <div className="flex gap-4 pt-0 lg:pt-[36px]">
        <div className="col hidden md:block">
          <ProductSidebar />
        </div>

        <div className="grow overflow-hidden">
          {/* <ProductList /> */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SubLayout
