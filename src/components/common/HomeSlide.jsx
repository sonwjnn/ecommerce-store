import { SwiperSlide } from 'swiper/react'
import AutoSwiper from './AutoSwiper'
import { handleLinkImage } from '../../utilities/constants'

const HomeSlide = () => {
  const images = [
    'banner_1.jpg',
    'banner_2.jpg',
    'banner_3.jpg',
    'banner_4.jpg',
    'banner_5.png',
    'banner_6.jpg',
    'banner_7.jpg'
  ]
  return (
    <AutoSwiper>
      {images.map((link, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              className={`bg-no-repeat bg-cover ${
                index === 0 || index === 1 ? 'bg-center' : 'bg-left'
              }  md:bg-center h-full w-full`}
              style={{
                backgroundImage: `url(${
                  new URL(`../../assets/img/banners/${link}`, import.meta.url)
                    .href
                })`
              }}
            ></div>
          </SwiperSlide>
        )
      })}
    </AutoSwiper>
  )
}

export default HomeSlide
