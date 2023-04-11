import React from "react";

const Category = () => {
  return (
    <>
      <nav className="category">
        <header className="category__heading">DANH MỤC</header>
        <ul className="category-list">
          <li className="category-item">
            <a href="#" className="category-item__link">
              Sản phẩm
            </a>
          </li>
          <li className="category-item">
            <a href="#" className="category-item__link">
              Màn hình
            </a>
          </li>
          <li className="category-item">
            <a href="#" className="category-item__link">
              Thiết bị lưu trữ
            </a>
          </li>
          <li className="category-item">
            <a href="#" className="category-item__link">
              Máy tính bàn
            </a>
          </li>
          <li className="category-item">
            <a href="#" className="category-item__link">
              Chuột và bàn phím
            </a>
          </li>
          <li className="category-item">
            <a href="#" className="category-item__link">
              Ram máy tính
            </a>
          </li>
          <li className="category-item category-item--active">
            <a href="#" className="category-item__link">
              Case máy tính
            </a>
          </li>
          <li className="category-item">
            <a href="#" className="category-item__link">
              VGA-Card màn hình
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Category;
