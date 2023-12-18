import ProductSidebar from '@/components/ProductSidebar'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const SubLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className="app__container">
        <div className="mx-auto max-w-[1440px]">
          <div className="sm-gutter app__content flex pt-0 lg:pt-[36px]">
            <div className="col hidden md:block">
              <ProductSidebar />
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

export default SubLayout
