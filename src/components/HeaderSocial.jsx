import React from "react";

const HeaderSocial = () => {
  return (
    <ul className="nav-list">
      <li className="nav-list-item">Kênh người bán</li>
      <li className="nav-list-item nav-list-item-qr-open nav-list-item--separate">
        Tải ứng dụng
        <div className="nav-qr-add"></div>
        <div className="nav-qr-code">
          <img
            src="src/assets/img/qr-code.png"
            alt="img"
            className="nav-qr-code__img"
          />
          <div className="nav-qr-code__link">
            <a href="#" className="nav-qr-code__link-item">
              <img
                src="src/assets/img/google-play.png"
                alt="img"
                className="nav-qr-code__link-img"
              />
            </a>
            <a href="#" className="nav-qr-code__link-item">
              <img
                src="src/assets/img/app-store.png"
                alt="img"
                className="nav-qr-code__link-img"
              />
            </a>
            <a href="#" className="nav-qr-code__link-item">
              <img
                src="src/assets/img/app-galerry.png"
                alt="img"
                className="nav-qr-code__link-img"
              />
            </a>
          </div>
        </div>
      </li>
      <li className="nav-list-item nav-list-item--separate">
        <span className="header__nav-title--no-pointer">Kết nối</span>
        <a href="" className="nav-item-link">
          <i className="nav-icon fa-brands fa-facebook-square ml-8"></i>
        </a>
        <a href="" className="nav-item-link">
          <i className="nav-icon fa-brands fa-instagram ml-8"></i>
        </a>
      </li>
    </ul>
  );
};

export default HeaderSocial;
