import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const Pagination = props => {
  const { pageLimits, onPageSelect, typeName, cateName } = props
  const [activePage, setActivePage] = useState(0)

  const pageNumbers = Array.from(
    { length: pageLimits },
    (_, index) => index + 1
  )
  return (
    <div className="mt-8">
      <ul className="pagination">
        <li className="pagination-item">
          <button href="" className="pagination-item__link">
            <i className="pagination-item__icon ti-angle-left"></i>
          </button>
        </li>
        {pageNumbers.map((number, index) => (
          <li className="pagination-item" key={number}>
            <Link
              to={`/products/${cateName}/${typeName}/?page=${number}`}
              className={`pagination-item__link ${
                activePage === index ? 'pagination-item__link--active' : ''
              }`}
              onClick={() => {
                setActivePage(index)
                onPageSelect(number)
              }}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
