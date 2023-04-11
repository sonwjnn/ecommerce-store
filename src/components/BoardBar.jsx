import React from "react";

const BoardBar = () => {
  return (
    <>
      <div className="home-filter hide-on-mobile-tablet">
        <span className="home-filter__lable">Sắp xếp theo</span>
        <button className="home-filter__btn btn">Phổ biến</button>
        <button className="home-filter__btn btn btn-primary">Mới nhất</button>
        <button className="home-filter__btn btn">Bán chạy</button>

        <div className="select-input">
          <span className="select-input__lable">Giá</span>
          <i className="select-input__icon ti-angle-down"></i>
          <ul className="select-input__menu">
            <li className="select-input__item">
              <a href="" className="select-input__link">
                <i className="select-input__icon fa-solid fa-arrow-down-1-9"></i>
                Giá: Thấp đến cao
              </a>
            </li>
            <li className="select-input__item">
              <a href="" className="select-input__link">
                <i className="select-input__icon fa-solid fa-arrow-down-9-1"></i>
                Giá: Cao đến thấp
              </a>
            </li>
          </ul>
        </div>
        <div className="home-filter__page">
          <div className="home-filter__page-num">
            <span className="home-filter__page-current">1</span>/15
          </div>
          <div className="home-filter__page-move">
            <a
              href=""
              className="home-filter__page-btn home-filter__page-btn--disable"
            >
              <i className="home-filter__page-icon home-filter__page-icon--disable ti-angle-left"></i>
            </a>
            <a href="" className="home-filter__page-btn">
              <i className="home-filter__page-icon ti-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
      <nav className="mobile-category">
        <ul className="mobile-category__list">
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
          <li className="mobile-category__item">
            <a href="" className="mobile-category__link">
              Dụng cụ & Thiết bị tiện ích
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BoardBar;
