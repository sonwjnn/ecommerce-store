import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Pagination = props => {
  const { pageLimits, currentPage, typeName, cateName } = props
  const [activePage, setActivePage] = useState(0)

  useEffect(() => {
    if (currentPage) setActivePage(currentPage - 1)
  }, [currentPage])

  const pageNumbers = Array.from(
    { length: pageLimits },
    (_, index) => index + 1
  )

  return (
    <div className="mt-12">
      <div className="flex gap-8 justify-center items-center">
        <button className="pagination-item__link">
          <i className="pagination-item__icon ti-angle-left"></i>
        </button>
        {pageNumbers.map((number, index) => (
          <Link
            key={number}
            to={`/products/${cateName}/${typeName}?page=${number}`}
            className={`pagination-item__link ${
              activePage === index ? 'pagination-item__link--active' : ''
            }`}
          >
            {number}
          </Link>
        ))}
        <button className="pagination-item__link">
          <i className="pagination-item__icon ti-angle-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Pagination
