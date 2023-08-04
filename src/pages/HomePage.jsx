import HomeSlide from '../components/common/HomeSlide'
import Category from '../components/common/Category'
import ProductHint from '../components/common/ProductHint'
import { bannerLogos } from '../utilities/constants'

const HomePage = () => {
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
                className="hover:mt-[-2px] transition-all min-w-[100px]  flex flex-col gap-2 items-center justify-start cursor-pointer "
                key={index}
              >
                <div
                  className="bg-no-repeat bg-cover h-[45px]  w-[45px]"
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
          <Category />
        </div>

        <div className="product-hint-bar max-w-[1200px] sticky top-0   h-full mt-4  bg-white mx-auto ">
          <div className="p-8 uppercase text-primary font-semibold text-[20px] text-center border-b-4 border-primary">
            gợi ý hôm nay
          </div>
        </div>

        <div className="max-w-[1200px] h-full mt-4 mx-auto pb-[50px]">
          <ProductHint />
        </div>
      </div>
    </>
  )
}

export default HomePage
