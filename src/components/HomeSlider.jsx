import { cn } from '@/lib/utils'
import { SwiperSlide } from 'swiper/react'

import SwiperProvider from '../providers/SwiperProvider'

const HomeSlider = () => {
  const images = [
    'banner_1.jpg',
    'banner_2.jpg',
    'banner_3.jpg',
    'banner_4.jpg',
    'banner_5.jpg',
  ]
  return (
    <SwiperProvider>
      {images.map((link, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              className={cn(
                `h-full w-full bg-cover bg-no-repeat md:bg-center`,
                index === 0 || index === 1 ? 'bg-center' : 'bg-left'
              )}
              style={{
                backgroundImage: `url(${
                  new URL(`../assets/images/banners/${link}`, import.meta.url)
                    .href
                })`,
              }}
            ></div>
          </SwiperSlide>
        )
      })}
    </SwiperProvider>
  )
}

export default HomeSlider
