import { BsFacebook } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
const urlSocial = new URL('../assets/img/notify-product.jfif', import.meta.url)
  .href
const HeaderSocial = () => {
  return (
    <ul className="nav-list">
      <li className="nav-list-item">Kênh người bán</li>
      <li className="nav-list-item nav-list-item-qr-open nav-list-item--separate">
        Tải ứng dụng
        <div className="nav-qr-add"></div>
        <div className="nav-qr-code">
          <img
            src={new URL('../assets/img/qr-code.png', import.meta.url).href}
            alt="img"
            className="nav-qr-code__img"
          />
          <div className="nav-qr-code__link ">
            <button className="nav-qr-code__link-item px-1 py-2">
              <img
                src={
                  new URL('../assets/img/google-play.png', import.meta.url).href
                }
                alt="img"
                className="nav-qr-code__link-img "
              />
            </button>
            <button className="nav-qr-code__link-item px-1 py-2">
              <img
                src={
                  new URL('../assets/img/app-store.png', import.meta.url).href
                }
                alt="img"
                className="nav-qr-code__link-img"
              />
            </button>
            <button className="nav-qr-code__link-item px-1 py-2">
              <img
                src={
                  new URL('../assets/img/app-galerry.png', import.meta.url).href
                }
                alt="img"
                className="nav-qr-code__link-img"
              />
            </button>
          </div>
        </div>
      </li>
      <li className="nav-list-item nav-list-item--separate">
        <span className="header__nav-title--no-pointer">Kết nối</span>
        <button className="nav-item-link">
          <BsFacebook className="text-white ml-3 text-[16px]" />
        </button>
        <button className="nav-item-link ml-2 text-[20px]">
          <AiFillInstagram className="text-white" />
        </button>
      </li>
    </ul>
  )
}

export default HeaderSocial
