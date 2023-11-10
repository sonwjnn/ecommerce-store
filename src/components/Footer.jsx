import { socialNetworkLinks } from '@/utilities/constants'
import { AiFillApple } from 'react-icons/ai'
import { BsGooglePlay } from 'react-icons/bs'
import { TbBrandAppgallery } from 'react-icons/tb'

const Footer = () => {
  return (
    <footer className="footer font-be mt-8 border border-t-4 border-primary text-sm">
      <div className="wide grid">
        <div className="row footer-spacing"></div>
        <div className="row footer-body footer__content">
          <div className="col l-2-4 c-6">
            <ul className="footer-list">
              <h3 className="footer-list__heading text-sm">
                CHĂM SÓC KHÁCH HÀNG
              </h3>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Trung Tâm Trợ Giúp
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Shopee Blog
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Shopee Mall
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Hướng Dẫn Mua Hàng
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">Thanh Toán</div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">Shopee Xu</div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">Vận Chuyển</div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Trả Hàng & Hoàn Tiền
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Chăm Sóc Khách Hàng
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Chính Sách Bảo Hành
                </div>
              </li>
            </ul>
          </div>
          <div className="col l-2-4 c-6">
            <ul className="footer-list">
              <h3 className="footer-list__heading text-sm">VỀ SHOPEE</h3>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Giới Thiệu Về Shopee Việt Nam
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">Tuyển Dụng</div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Điều Khoản Shopee
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Chính Sách Bảo Mật
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">Chính Hãng</div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Kênh Người Bán
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Flash Sales
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Chương Trình Tiếp Thị Liên Kết Shopee
                </div>
              </li>
              <li className="footer-list-item">
                <div className="footer-list-item__link text-sm">
                  Liên Hệ Với Truyền Thông
                </div>
              </li>
            </ul>
          </div>
          <div className="col l-2-4 c-6">
            <ul className="footer-list">
              <ul className="footer-list-sub ">
                <h3 className="footer-list-sub__heading text-sm">THANH TOÁN</h3>
              </ul>
              <ul className="footer-list-sub">
                <h3 className="footer-list-sub__heading text-sm">
                  ĐƠN VỊ VẬN CHUYỂN
                </h3>
              </ul>
            </ul>
          </div>
          <div className="col l-2-4 c-6">
            <ul className="footer-list">
              <h3 className="footer-list__heading text-sm">
                THEO DÕI CHÚNG TÔI TRÊN
              </h3>
              {socialNetworkLinks.map(item => {
                const Icon = item.icon
                return (
                  <a
                    className="mt-2 flex items-center justify-start gap-x-2 rounded-full text-[#605f5f] hover:brightness-110"
                    key={item.title}
                    href={item.link}
                    target="_blank"
                  >
                    <Icon className="text-lg " />

                    {item.title}
                  </a>
                )
              })}
            </ul>
          </div>
          <div className="col l-2-4 c-12">
            <ul className="footer-list">
              <h3 className="footer-list__heading text-sm">
                TẢI ỨNG DỤNG SHOPEE NGAY
              </h3>
              <div className="footer-list__wrap">
                <li className="footer-list-item footer-list__app ">
                  <button className="footer-list-item__link footer-list-appstore mt-2 flex text-left text-[#605f5f]">
                    <AiFillApple size={20} className="mr-1" />
                    App Store
                  </button>
                  <button className="footer-list-item__link footer-list-google mt-2 flex text-left text-[#605f5f]">
                    <BsGooglePlay size={20} className="mr-1" />
                    Google Play
                  </button>
                  <button className="footer-list-item__link footer-list-gallery mt-2 flex text-left text-[#605f5f]">
                    <TbBrandAppgallery size={20} className="mr-1" />
                    App Gallery
                  </button>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div className="row footer-region hide-on-mobile">
          <div className="grid__column-4 footer-region-titles">
            <span className="footer-region-title">
              © 2023 Sonwjn shopping. Tất cả các quyền được bảo lưu.
            </span>
          </div>
          <div className="grid__column-8 footer-region-place">
            <span className="footer-region-nation">
              Quốc gia & Khu vực:
              <div className="footer-region-nation__link">Singapore</div>
              <div className="footer-region-nation__link">Indonesia</div>
              <div className="footer-region-nation__link">Đài Loan</div>
              <div className="footer-region-nation__link">Thái Lan</div>
              <div className="footer-region-nation__link">Malaysia</div>
              <div className="footer-region-nation__link">Việt Nam</div>
              <div className="footer-region-nation__link">Philippines</div>
              <div className="footer-region-nation__link">Brazil</div>
              <div className="footer-region-nation__link">Mexico</div>
              <div className="footer-region-nation__link">Colombia</div>
              <div className="footer-region-nation__link">Chile</div>
              <div className="footer-region-nation__link">Poland</div>
              <div className="footer-region-nation__link">France</div>
              <div className="footer-region-nation__link">Spain</div>
              <div className="footer-region-nation__link">India</div>
              <div className="footer-region-nation__link">Argentina</div>
            </span>
          </div>
        </div>
      </div>
      <div className="footer-footer__full">
        <div className="wide grid">
          <div className="row footer-footer">
            <div className="row footer-footer-heading hide-on-mobile">
              <span className="footer-footer-heading__link">
                CHÍNH SÁCH BẢO MẬT
              </span>
              <span className="footer-footer-heading__link">
                QUY CHẾ HOẠT ĐỘNG
              </span>
              <span className="footer-footer-heading__link">
                CHÍNH SÁCH VẬN CHUYỂN
              </span>
              <span className="footer-footer-heading__link">
                CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN
              </span>
            </div>

            <div className="row footer-footer-company hide-on-mobile">
              Công ty TNHH Sonwjn
            </div>
            <div className="row footer-footer-text hide-on-mobile text-xs">
              <p>
                Địa chỉ: Tầng 4-5-6, Tòa nhà Sonwjn Towner, số 29 đường Bà Điểm
                4, Quận 12, Thành phố Hồ Chí Minh, Việt Nam. Tổng đài hỗ trợ:
                19001221 - Email: nguyenlehoangson2106@gmail.com
              </p>
              <p>
                Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Lê Hoàng Sơn - Điện
                thoại liên hệ: 083 7474 905
              </p>
              <p>
                Mã số doanh nghiệp: 0123456789 do Sở Kế hoạch & Đầu tư TP Hồ Chí
                Minh cấp lần đầu ngày 10/02/2023
              </p>
            </div>
            <div className="row footer-footer-copyright">
              <p>© 2023 - Bản quyền thuộc về Công ty TNHH Sonwin</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
