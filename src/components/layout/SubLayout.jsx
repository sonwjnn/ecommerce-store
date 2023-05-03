import Category from '../Category'
import BoardBar from '../BoardBar'
import Pagination from '../Pagination'
import productConfigs from '../../configs/product.configs'
import { Outlet } from 'react-router-dom'
import ProductLoading from '../common/ProductLoading'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setProductsSortPrice } from '../../redux/features/productSlice'

const SubLayout = () => {
  const dispatch = useDispatch()

  const handleSortPriceUpDown = () => {
    dispatch(setProductsSortPrice('upToDown'))
  }

  const handleSortPriceDownUp = () => {
    dispatch(setProductsSortPrice('downToUp'))
  }
  return (
    <>
      <div className="app__container">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex sm-gutter pt-0 lg:pt-[36px] app__content">
            <div className="col hidden md:block">
              <Category productCategory={productConfigs.electronic} />
            </div>

            <div className="col col-span-10 overflow-hidden grow">
              <BoardBar
                handleSortPriceUpDown={handleSortPriceUpDown}
                handleSortPriceDownUp={handleSortPriceDownUp}
              />
              <ProductLoading />
              {/* <ProductList /> */}
              <Outlet />
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubLayout
