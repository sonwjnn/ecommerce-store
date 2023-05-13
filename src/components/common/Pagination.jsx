import React from 'react'

const Pagination = () => {
  return (
    <>
      <ul className="pagination">
        <li className="pagination-item">
          <button href="" className="pagination-item__link">
            <i className="pagination-item__icon ti-angle-left"></i>
          </button>
        </li>
        <li className="pagination-item">
          <button
            href="#"
            className="pagination-item__link pagination-item__link--active"
          >
            1
          </button>
        </li>
        <li className="pagination-item">
          <button href="#" className="pagination-item__link">
            2
          </button>
        </li>
        <li className="pagination-item">
          <button href="#" className="pagination-item__link">
            3
          </button>
        </li>
        <li className="pagination-item">
          <button href="#" className="pagination-item__link">
            4
          </button>
        </li>
        <li className="pagination-item">
          <button href="#" className="pagination-item__link">
            5
          </button>
        </li>

        <li className="pagination-item">
          <button href="" className="pagination-item__link">
            <i className="pagination-item__icon ti-angle-right"></i>
          </button>
        </li>
      </ul>
    </>
  )
}

export default Pagination
