import { Navigation, Pagination } from 'swiper'
import { Swiper } from 'swiper/react'

const NavigationSwiper = ({ children }) => {
  return (
    <div className="navigate-swiper">
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="w-full h-full"
      >
        {children}
      </Swiper>
    </div>
  )
}

export default NavigationSwiper
