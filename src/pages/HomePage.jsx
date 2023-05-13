import BoardContent from '../components/common/BoardContent'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import productConfigs from '../configs/product.configs'
import { handleLinkImage } from '../utilities/constants'
import HomeSlide from '../components/common/HomeSlide'
import ProductList from '../components/common/ProductList'
import CategoryItem from '../components/common/CategoryItem'

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

let indexGlobal = 0

const HomePage = () => {
  const [cates, setCates] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    setCates(productConfigs.productCategory)
  }, [])
  const disableCategories = productConfigs.productCategory.filter(
    item => item !== 'Thiết Bị Điện Tử'
  )

  // Gộp các phần tử thành các cặp
  const catePairs = productConfigs.productCategory.reduce(
    (acc, cateType, index) => {
      if (index % 2 === 0) {
        acc.push([{ cateType, index }])
      } else {
        acc[acc.length - 1].push({ cateType, index })
      }
      return acc
    },
    []
  )

  return (
    <>
      <div className="bg-bg_page mt-[64px] lg:mt-[150px] ">
        <div className=" mb-8 w-full bg-white ">
          <div className="max-w-[1200px] min-h-[235px] mx-auto gap-2 flex">
            <div className="flex-wrap mx-0 sm:mx-14 lg:mx-0   lg:flex-nowrap flex-[66%] rounded-sm">
              <HomeSlide />
            </div>

            <div className="lg:flex-[33%] gap-2 flex flex-col ">
              <div
                className="h-1/2 bg-no-repeat bg-cover rounded-sm"
                style={{
                  backgroundImage: `url(${
                    new URL(
                      '../assets/img/banners/banner_8.jpg',
                      import.meta.url
                    ).href
                  })`
                }}
              ></div>
              <div
                className="h-1/2 bg-no-repeat  bg-cover rounded-sm"
                style={{
                  backgroundImage: `url(${
                    new URL(
                      '../assets/img/banners/banner_9.png',
                      import.meta.url
                    ).href
                  })`
                }}
              ></div>
            </div>
          </div>
          <div className="max-w-[1200px]   px-12 min-h-[108px] flex-wrap lg:flex-nowrap lg:mx-auto gap-2 flex justify-around mt-8">
            {bannerLogos.map((item, index) => (
              <div
                className="min-w-[100px]  flex flex-col gap-2 items-center justify-start cursor-pointer "
                key={index}
              >
                <div
                  className="bg-no-repeat bg-cover h-[45px] w-[45px]"
                  style={{
                    backgroundImage: `url(${
                      new URL(
                        `../assets/img/banner_logos/logo_${index + 1}.png`,
                        import.meta.url
                      ).href
                    })`
                  }}
                ></div>
                <div className="capitalize text-center text-[12px]">{item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1200px] h-full  bg-white mx-auto ">
          <div>
            <div className="p-8 uppercase text-gray-500 text-[18px]">
              danh mục
            </div>
            <div className="flex  overflow-x-auto flex-nowrap">
              {catePairs.map((catePair, index) => (
                <div className="flex flex-col min-w-[120px]" key={index}>
                  {catePair.map(cate => (
                    <CategoryItem
                      key={cate.index}
                      index={cate.index}
                      cateType={cate.cateType}
                      disable={disableCategories.includes(cate.cateType)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] h-full mt-4  bg-white mx-auto ">
          <div className="p-8 uppercase text-primary font-semibold text-[20px] text-center border-b-4 border-primary">
            gợi ý hôm nay
          </div>
        </div>

        <div className="max-w-[1200px] h-full mt-4 mx-auto ">
          <ProductList />
        </div>
      </div>
    </>
  )
}

export default HomePage
