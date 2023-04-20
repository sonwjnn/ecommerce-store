import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setAuthModalOpen } from '../redux/features/authModelSlice'
import { setSignState } from '../redux/features/signStateSlice'
import { setUser } from '../redux/features/userSlice'
import { useNavigate } from 'react-router-dom'

const actionState = {
  signin: 'signin',
  signup: 'signup'
}
const HeaderMenu = () => {
  const history = useNavigate()

  const authUserPage = value => {
    history(`/authUser/${value}`)
  }
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const [anchorEl, setAnchorEl] = useState(null)
  const toggleMenu = e => setAnchorEl(e.currentTarget)
  return (
    <ul className="nav-list">
      <li className="nav-list-item">
        <a href="" className="nav-item-link">
          <i className="nav-icon fa-regular fa-bell mr-4"></i>
          Thông báo
        </a>
        <div className="nav-notify-add"></div>
        <div className="nav-notify">
          <div className="notify-header">
            <h3 className="notify-header-info">Thông báo mới nhận</h3>
          </div>
          <div className="notify-container">
            <a href="#" className="notify-container-ptn">
              <span className="notify-container-img-box">
                <img
                  className="notify-container-img"
                  src="src/assets/img/notify-product.jfif"
                  alt="img"
                />
              </span>
              <span className="notify-container-content-box">
                <h3 className="notify-container-title">
                  Mua 1 được 20 voucher cực hời !!!
                </h3>
                <p className="notify-container-decription">
                  Tiết kiệm đến 1 triệu đồng. Bộ 20 voucher gồm các mã hot:
                  Freeship, giảm giá, hoàn xu đến 200k. Dùng cho cả tháng - Săn
                  ngay!
                </p>
              </span>
            </a>
            <a href="#" className="notify-container-ptn">
              <span className="notify-container-img-box">
                <img
                  className="notify-container-img"
                  src="src/assets/img/notify-product.jfif"
                  alt="img"
                />
              </span>
              <span className="notify-container-content-box">
                <h3 className="notify-container-title">
                  Mua 1 được 20 voucher cực hời !!!
                </h3>
                <p className="notify-container-decription">
                  Tiết kiệm đến 1 triệu đồng. Bộ 20 voucher gồm các mã hot:
                  Freeship, giảm giá, hoàn xu đến 200k. Dùng cho cả tháng - Săn
                  ngay!
                </p>
              </span>
            </a>
            3
            <a href="#" className="notify-container-ptn">
              <span className="notify-container-img-box">
                <img
                  className="notify-container-img"
                  src="src/assets/img/notify-product.jfif"
                  alt="img"
                />
              </span>
              <span className="notify-container-content-box">
                <h3 className="notify-container-title">
                  Mua 1 được 20 voucher cực hời !!!
                </h3>
                <p className="notify-container-decription">
                  Tiết kiệm đến 1 triệu đồng. Bộ 20 voucher gồm các mã hot:
                  Freeship, giảm giá, hoàn xu đến 200k. Dùng cho cả tháng - Săn
                  ngay!
                </p>
              </span>
            </a>
            <a href="#" className="notify-container-ptn">
              <span className="notify-container-img-box">
                <img
                  className="notify-container-img"
                  src="src/assets/img/notify-product.jfif"
                  alt="img"
                />
              </span>
              <span className="notify-container-content-box">
                <h3 className="notify-container-title">
                  Mua 1 được 20 voucher cực hời !!!
                </h3>
                <p className="notify-container-decription">
                  Tiết kiệm đến 1 triệu đồng. Bộ 20 voucher gồm các mã hot:
                  Freeship, giảm giá, hoàn xu đến 200k. Dùng cho cả tháng - Săn
                  ngay!
                </p>
              </span>
            </a>
            <a href="#" className="notify-container-ptn">
              <span className="notify-container-img-box">
                <img
                  className="notify-container-img"
                  src="src/assets/img/notify-product.jfif"
                  alt="img"
                />
              </span>
              <span className="notify-container-content-box">
                <h3 className="notify-container-title">
                  Mua 1 được 20 voucher cực hời !!!
                </h3>
                <p className="notify-container-decription">
                  Tiết kiệm đến 1 triệu đồng. Bộ 20 voucher gồm các mã hot:
                  Freeship, giảm giá, hoàn xu đến 200k. Dùng cho cả tháng - Săn
                  ngay!
                </p>
              </span>
            </a>
          </div>
          <div className="notify-footer">
            <a href="#" className="notify-footer-btn">
              Xem tất cả
            </a>
          </div>
        </div>
      </li>
      <li className="nav-list-item ">
        <a href="#" className="nav-item-link">
          <i className="nav-icon fa-regular fa-circle-question mr-4"></i>
          Trợ giúp
        </a>
      </li>
      <li className="nav-list-item">
        <a href="#" className="nav-item-link">
          <i className="nav-icon fa-solid fa-globe mr-4"></i>
          Tiếng Việt
          <i className="nav-icon fa-solid fa-angle-down ml-4 mr-4"></i>
        </a>
        <div className="language-item-add"></div>
        <div className="nav-language">
          <a href="#" className="language-item">
            Tiếng Việt
          </a>
          <a href="#" className="language-item">
            English
          </a>
        </div>
      </li>
      {/* <li className="nav-list-item nav-list-item--strong">Đăng ký</li>
                        <li className="nav-list-item nav-list-item--strong nav-list-item--separate">Đăng nhập</li>  */}
      <li className="nav-list-item nav-list-item-user">
        <div className="nav-list-item-user-add"></div>

        {user ? (
          <>
            <span className="nav-list-item-user-img-wrap">
              <img
                src="src/assets/img/user-avt.jpg"
                alt="#"
                className="nav-list-item-user-img"
              />
            </span>
            <span className="nav-list-item-user-name">
              {user.name ? user.name : 'null'}
            </span>
            <ul className="nav-list-item-user-menu">
              <li className="nav-list-item-user-menu-item">
                <button>Tài khoản của tôi</button>
              </li>
              <li className="nav-list-item-user-menu-item">
                <button href="!#">Đơn mua</button>
              </li>
              <li className="nav-list-item-user-menu-item">
                <button href="!#" onClick={() => dispatch(setUser(null))}>
                  Đăng xuất
                </button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <button
              className="signup-btn hover:text-sky-300 mr-5 "
              onClick={() => {
                authUserPage(actionState.signup)
              }}
            >
              Đăng kí
            </button>
            <button
              className="signin-btn hover:text-sky-300 "
              onClick={() => {
                authUserPage(actionState.signin)
              }}
            >
              Đăng nhập
            </button>
          </>
        )}
      </li>
    </ul>
  )
}

export default HeaderMenu