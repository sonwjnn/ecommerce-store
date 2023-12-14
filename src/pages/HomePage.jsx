import Category from '@/components/Category'
import HomeSlide from '@/components/HomeSlide'
import ProductHint from '@/components/ProductHint'

const HomePage = () => {
  return (
    <div className="bg-bg_page mt-[64px] lg:mt-[150px] ">
      <div className=" mb-8 w-full bg-white ">
        <div className="mx-auto flex min-h-[280px] max-w-[1200px] gap-2  py-4">
          <div className="mx-0 flex-[66%] flex-wrap overflow-hidden rounded-sm sm:mx-14 lg:mx-0 lg:flex-nowrap">
            <HomeSlide />
          </div>

          <div className="flex flex-col gap-2 lg:flex-[33%] ">
            <div
              className="h-1/2  rounded-sm bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${
                  new URL('@/assets/img/banners/banner_8.svg', import.meta.url)
                    .href
                })`,
              }}
            ></div>
            <div
              className="h-1/2  rounded-sm  bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${
                  new URL('@/assets/img/banners/banner_9.svg', import.meta.url)
                    .href
                })`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] justify-between gap-x-4">
        <div className="h-full  rounded-md bg-white">
          <Category />
        </div>

        <div className="flex w-[calc(100%-254px)] flex-col">
          <div className="product-hint-bar sticky top-0 mx-auto  w-full rounded-md bg-white">
            <div className="border-b-4 border-primary px-8 py-4 text-center text-xl font-semibold uppercase text-primary">
              gợi ý hôm nay
            </div>
          </div>

          <div className="mx-auto mt-4 h-full max-w-[1200px] pb-[50px]">
            <ProductHint />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
