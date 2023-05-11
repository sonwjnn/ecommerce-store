import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setAuthModalOpen } from '../redux/features/authModelSlice'
import { setSignState } from '../redux/features/signStateSlice'
import { setUser } from '../redux/features/userSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { RiGlobalLine } from 'react-icons/ri'

const actionState = {
  signin: 'signin',
  signup: 'signup'
}
const HeaderMenu = () => {
  const history = useNavigate()
  const location = useLocation()

  const authUserPage = value => {
    history(`/authUser/${value}`)
  }
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleMenu = e => setAnchorEl(e.currentTarget)

  const checkUserRoute = location.pathname.includes('user')

  const urlAvar = new URL('../assets/img/user-avt.jpg', import.meta.url).href

  const urlNotify = new URL(
    '../assets/img/notify-product.jfif',
    import.meta.url
  ).href
  return (
    <ul className="nav-list">
      <li className="nav-list-item">
        <button href="" className="nav-item-link">
          <i className="nav-icon fa-regular fa-bell mr-4"></i>
          Thông báo
        </button>
        <div className="nav-notify-add"></div>
        <div className="nav-notify">
          <div className="notify-header">
            <h3 className="notify-header-info">Thông báo mới nhận</h3>
          </div>
          <div className="notify-container">
            <button className="notify-container-ptn">
              <span className="notify-container-img-box w-[100px]">
                <img
                  className="notify-container-img"
                  src={`${urlNotify}`}
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
            </button>
            <button className="notify-container-ptn">
              <span className="notify-container-img-box w-[100px]">
                <img
                  className="notify-container-img"
                  src={`${urlNotify}`}
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
            </button>
            3
            <button className="notify-container-ptn">
              <span className="notify-container-img-box w-[100px]">
                <img
                  className="notify-container-img"
                  src={`${urlNotify}`}
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
            </button>
            <button className="notify-container-ptn">
              <span className="notify-container-img-box w-[100px]">
                <img
                  className="notify-container-img"
                  src={`${urlNotify}`}
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
            </button>
            <button className="notify-container-ptn">
              <span className="notify-container-img-box w-[100px]">
                <img
                  className="notify-container-img"
                  src={`${urlNotify}`}
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
            </button>
          </div>
          <div className="notify-footer">
            <button className="notify-footer-btn">Xem tất cả</button>
          </div>
        </div>
      </li>
      <li className="nav-list-item ">
        <button className="nav-item-link">
          <i className="nav-icon fa-regular fa-circle-question mr-4"></i>
          Trợ giúp
        </button>
      </li>
      <li className="nav-list-item ">
        <button className="nav-item-link">
          <RiGlobalLine className="text-[20px] mr-2" />
          Tiếng Việt
          <i className="nav-icon fa-solid fa-angle-down ml-4 mr-4"></i>
        </button>
        <div className="language-item-add"></div>
        <div className="nav-language">
          <button className="language-item w-full text-left">Tiếng Việt</button>
          <button className="language-item w-full text-left">English</button>
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
                src={`${urlAvar}`}
                alt="#"
                className="nav-list-item-user-img"
              />
            </span>
            <span className="nav-list-item-user-name text-[16px]">
              {user.name ? user.name : 'null'}
            </span>
            <ul className="nav-list-item-user-menu">
              <li className="nav-list-item-user-menu-item">
                <button>
                  <Link to={'/user/account/profile'}>Tài khoản của tôi</Link>
                </button>
              </li>
              <li className="nav-list-item-user-menu-item">
                <Link to={'/user/purchase'}>
                  <button>Đơn mua</button>
                </Link>
              </li>
              <li className="nav-list-item-user-menu-item">
                <Link to={'/user/favorite'}>
                  <button>Yêu thích</button>
                </Link>
              </li>
              <li className="nav-list-item-user-menu-item">
                <Link to={checkUserRoute ? '/' : null}>
                  <button
                    onClick={() => {
                      dispatch(setUser(null))
                    }}
                  >
                    Đăng xuất
                  </button>
                </Link>
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
