import { Autoplay } from 'swiper'
import { Swiper } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'

const AutoSwiper = ({ children }) => {
  return (
    <div className="w-full h-full auto-swiper">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        slidesPerView="auto"
        grabCursor={true}
        className="w-full h-full"
        pagination={{ clickable: true }}
        navigation={true}
      >
        {children}
      </Swiper>
    </div>
  )
}

export default AutoSwiper
