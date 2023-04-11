import React from 'react'
import Category from './Category'
import BoardBar from './BoardBar'
import ProductList from './ProductList'
import Pagination from './Pagination'

const BoardContent = () => {
  return (
    <div className="app__container">
      <div className="grid wide">
        <div className="row sm-gutter app__content">
          <div className="col l-2 m-0 c-0">
            <Category />
          </div>

          <div className="col l-10 c-12">
            <BoardBar />

            <ProductList />

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardContent
