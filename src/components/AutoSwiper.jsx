import { Autoplay } from 'swiper'
import { Navigation, Pagination } from 'swiper'
import { Swiper } from 'swiper/react'

const AutoSwiper = ({ children }) => {
  return (
    <div className="auto-swiper h-full w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        slidesPerView="auto"
        grabCursor={true}
        className="h-full w-full"
        pagination={{ clickable: true }}
        navigation={true}
      >
        {children}
      </Swiper>
    </div>
  )
}

export default AutoSwiper
