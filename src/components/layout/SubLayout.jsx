import Category from '../Category'
import BoardBar from '../BoardBar'
import Pagination from '../Pagination'
import productConfigs from '../../configs/product.configs'
import { Outlet } from 'react-router-dom'
import ProductLoading from '../common/ProductLoading'

const SubLayout = () => {
  return (
    <div className="app__container">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex sm-gutter pt-0 lg:pt-[36px] app__content">
          <div className="col hidden md:block">
            <Category productCategory={productConfigs.electronic} />
          </div>

          <div className="col col-span-10 overflow-hidden">
            <BoardBar />
            <ProductLoading />
            {/* <ProductList /> */}
            <Outlet />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubLayout
