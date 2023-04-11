import React from "react";

const Pagination = () => {
  return (
    <>
      <ul className="pagination">
        <li className="pagination-item">
          <a href="" className="pagination-item__link">
            <i className="pagination-item__icon ti-angle-left"></i>
          </a>
        </li>
        <li className="pagination-item">
          <a
            href="#"
            className="pagination-item__link pagination-item__link--active"
          >
            1
          </a>
        </li>
        <li className="pagination-item">
          <a href="#" className="pagination-item__link">
            2
          </a>
        </li>
        <li className="pagination-item">
          <a href="#" className="pagination-item__link">
            3
          </a>
        </li>
        <li className="pagination-item">
          <a href="#" className="pagination-item__link">
            4
          </a>
        </li>
        <li className="pagination-item">
          <a href="#" className="pagination-item__link">
            5
          </a>
        </li>

        <li className="pagination-item">
          <a href="" className="pagination-item__link">
            <i className="pagination-item__icon ti-angle-right"></i>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
