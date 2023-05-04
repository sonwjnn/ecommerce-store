import BoardContent from '../components/BoardContent'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import productConfigs from '../configs/product.configs'
import { handleLinkImage } from '../utilities/constants'
import HomeSlide from '../components/common/HomeSlide'

const bannerLogos = [
  'khung giờ săn sale',
  'hàng hiệu outlet giảm 50%',
  'mã giảm giá',
  'miễn phí vẫn chuyển',
  'bắt trend - giá sốc',
  'voucher giảm đến 200.000Đ',
  'gì cũng rẻ - mua là free ship',
  'hàng quốc tế',
  'nạp điện thoại & thẻ game'
]

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className="bg-bg_page mt-[150px] ">
        <div className=" mb-8 w-full bg-white ">
          <div className="max-w-[1200px] min-h-[235px] mx-auto gap-2 flex">
            <div className="flex-[66%] rounded-sm">
              <HomeSlide />
            </div>

            <div className="flex-[33%] gap-2 flex flex-col ">
              <div
                className="h-1/2 bg-no-repeat bg-cover rounded-sm"
                style={{
                  backgroundImage: `url(${handleLinkImage(
                    '../assets/img/banners/banner_8.jpg'
                  )})`
                }}
              ></div>
              <div
                className="h-1/2 bg-no-repeat  bg-cover rounded-sm"
                style={{
                  backgroundImage: `url(${handleLinkImage(
                    '../assets/img/banners/banner_9.png'
                  )})`
                }}
              ></div>
            </div>
          </div>
          <div className="max-w-[1200px] min-h-[108px] mx-auto gap-2 flex justify-around mt-8">
            {bannerLogos.map((item, index) => (
              <div
                className="w-[100px]  flex flex-col gap-2 items-center justify-start cursor-pointer "
                key={index}
              >
                <div
                  className="bg-no-repeat bg-cover h-[45px] w-[45px]"
                  style={{
                    backgroundImage: `url(${handleLinkImage(
                      `../assets/img/banner_logos/logo_${index + 1}.png`
                    )})`
                  }}
                ></div>
                <div className="capitalize text-center text-[12px]">{item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1200px] min-h-screen  bg-white mx-auto ">
          <div>
            <div className="p-8 uppercase text-gray-500 text-[18px]">
              danh mục
            </div>
            <div className="grid grid-cols-8">
              {productConfigs.productCategory.map((cateType, index) => (
                <Link
                  to={`/products/${cateType.replace(
                    / /g,
                    '-'
                  )}/${'Tất cả sản phẩm'.replace(/ /g, '-')}`}
                  className="p-8 text-[16px] border border-gray-300 "
                  key={index}
                >
                  {cateType}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
