import { BsFacebook } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
const urlSocial = new URL('@/assets/img/notify-product.jfif', import.meta.url)
  .href
const HeaderSocial = () => {
  return (
    <ul className="nav-list text-sm">
      <li className="nav-list-item">Kênh người bán</li>
      <li className="nav-list-item nav-list-item-qr-open nav-list-item--separate">
        Tải ứng dụng
      </li>
      <li className="nav-list-item nav-list-item--separate">
        <span className="header__nav-title--no-pointer">Kết nối</span>
        <button className="nav-item-link">
          <BsFacebook className="text-white ml-3 text-base" />
        </button>
        <button className="nav-item-link ml-2 text-[20px]">
          <AiFillInstagram className="text-white" />
        </button>
      </li>
    </ul>
  )
}

export default HeaderSocial
