import ProductSidebar from '@/components/ProductSidebar'
import { Outlet } from 'react-router-dom'

const SubLayout = () => {
  return (
    <>
      <div className="app__container">
        <div className="mx-auto max-w-[1200px]">
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
