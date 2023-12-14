import dayjs from 'dayjs'

import Star from './Star'
import TextAvatar from './TextAvatar'

const ShopInfo = ({ shop }) => {
  return (
    <div className="mb-[-16px] mt-4 flex min-h-[130px] w-full items-center justify-center rounded-md bg-white  py-4 ">
      <div className="flex w-full flex-col items-center  gap-4">
        <div className="flex w-full items-center justify-center gap-x-4 bg-accent p-4">
          <div className="aspect-square h-[80px] w-[80px]">
            <TextAvatar text={shop?.title} />
          </div>
          <div className="flex flex-col gap-y-2">
            <h6 className="truncate text-xl font-medium text-[#242424]">
              {shop?.title}
            </h6>
            <Star stars={4} className="text-2xl text-yellow-500" />
          </div>
        </div>

        <div className="hidden justify-center   gap-2 md:flex">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-wrap  gap-x-4">
              <p className="text-sm  text-[#242424]">
                <span className="font-medium">Sản phẩm: </span>{' '}
                {shop?.productCount}
              </p>

              <p className="text-sm  text-[#242424]">
                <span className="font-medium">Đánh giá: </span>
                {shop?.reviewCount}
              </p>
              <p className="text-sm  text-[#242424]">
                <span className="font-medium">Ngày tạo: </span>
                {dayjs(shop?.createdAt).format('DD-MM-YYYY')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopInfo
