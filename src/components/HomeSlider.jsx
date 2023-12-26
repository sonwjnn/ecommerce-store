import { cn } from '@/lib/utils'
import { SwiperSlide } from 'swiper/react'

import SwiperProvider from '../providers/SwiperProvider'

const HomeSlider = () => {
  const images = ['banner_3.jpg', 'banner_4.jpg']
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
                backgroundImage: `url(/images/banners/${link}`,
              }}
            ></div>
          </SwiperSlide>
        )
      })}
    </SwiperProvider>
  )
}

export default HomeSlider
