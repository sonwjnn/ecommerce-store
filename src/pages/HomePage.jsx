import Category from '@/components/Category'
import HomeSlider from '@/components/HomeSlider'
import ProductRecommend from '@/components/ProductRecommend'
import Container from '@/components/ui/container'

const HomePage = () => {
  return (
    <Container className="mt-36">
      <div className=" mb-8 w-full "></div>
      <div className="mx-auto flex max-w-[1280px] justify-between gap-x-4">
        <div className="hidden  h-full rounded-md bg-white md:block">
          <Category />
        </div>

        <div className="flex w-full flex-col gap-y-4  md:w-[calc(100%-254px)]">
          <div className="flex w-full flex-col gap-2 rounded-md bg-white p-2">
            <div className="mx-0 h-[280px] w-full overflow-hidden  rounded-sm ">
              <HomeSlider />
            </div>
            <div className="flex h-[140px] w-full gap-2 ">
              <div
                className="w-1/2 rounded-sm bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(/images/banners/banner_3.jpg)`,
                }}
              ></div>
              <div
                className="w-1/2  rounded-sm  bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(/images/banners/banner_4.jpg)`,
                }}
              ></div>
            </div>
          </div>

          <div className="w-full rounded-md text-2xl  font-bold text-[#242424]">
            Tất cả sản phẩm
          </div>

          <div className="h-full max-w-[1200px] pb-[50px]">
            <ProductRecommend />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HomePage
