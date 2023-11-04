import Category from '@/components/Category'
import HomeSlide from '@/components/HomeSlide'
import ProductHint from '@/components/ProductHint'
import { bannerLogos } from '@/utilities/constants'

const HomePage = () => {
  return (
    <>
      <div className="mt-[64px] bg-bg_page lg:mt-[150px] ">
        <div className=" mb-8 w-full bg-white ">
          <div className="mx-auto flex min-h-[235px] max-w-[1200px] gap-2">
            <div className="mx-0 flex-[66%] flex-wrap rounded-sm   sm:mx-14 lg:mx-0 lg:flex-nowrap">
              <HomeSlide />
            </div>

            <div className="flex flex-col gap-2 lg:flex-[33%] ">
              <div
                className="h-1/2 rounded-sm bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${
                    new URL(
                      '@/assets/img/banners/banner_8.jpg',
                      import.meta.url
                    ).href
                  })`,
                }}
              ></div>
              <div
                className="h-1/2 rounded-sm  bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${
                    new URL(
                      '@/assets/img/banners/banner_9.png',
                      import.meta.url
                    ).href
                  })`,
                }}
              ></div>
            </div>
          </div>
          <div className="mt-8   flex min-h-[108px] max-w-[1200px] flex-wrap justify-around gap-2 px-12 lg:mx-auto lg:flex-nowrap">
            {bannerLogos.map((item, index) => (
              <div
                className="flex min-w-[100px] cursor-pointer  flex-col items-center justify-start gap-2 transition-all hover:mt-[-2px] "
                key={index}
              >
                <div
                  className="h-[45px] w-[45px] bg-cover  bg-no-repeat"
                  style={{
                    backgroundImage: `url(${
                      new URL(
                        `../assets/img/banner_logos/logo_${index + 1}.png`,
                        import.meta.url
                      ).href
                    })`,
                  }}
                ></div>
                <div className="text-center text-[12px] capitalize">{item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto h-full  max-w-[1200px] bg-white ">
          <Category />
        </div>

        <div className="product-hint-bar sticky top-0 mx-auto   mt-4 h-full  max-w-[1200px] bg-white ">
          <div className="border-b-4 border-primary px-8 py-4 text-center text-[20px] font-semibold uppercase text-primary">
            gợi ý hôm nay
          </div>
        </div>

        <div className="mx-auto mt-4 h-full max-w-[1200px] pb-[50px]">
          <ProductHint />
        </div>
      </div>
    </>
  )
}

export default HomePage
