import dayjs from 'dayjs'
import { LuStore } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

import TextAvatar from './TextAvatar'
import { Button } from './ui/button'

const ShopPreview = ({ product }) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/shops/${product?.shopId?._id}`)
  }
  return (
    <div className="flex min-h-[130px] w-full items-center rounded-md bg-white px-6 py-4">
      <div className="flex flex-row items-center gap-4">
        {/* avatar */}
        <div className="aspect-square h-[80px] w-[80px]">
          <TextAvatar text={product?.shopId?.title} />
        </div>
        {/* avatar */}

        <div className="flex flex-col  justify-center gap-2">
          <h6 className="truncate text-base font-medium text-[#242424]">
            {product?.shopId?.title}
          </h6>
          <div className="flex flex-col gap-3 lg:flex-row">
            <Button
              onClick={onClick}
              variant="outline"
              className="min-w-[130px] border-primary px-3 text-primary"
            >
              <LuStore className="mr-2" />
              Xem Shop
            </Button>
            <div className="flex flex-wrap  gap-x-4">
              <p className="text-sm  text-[#242424]">
                <span className="font-medium">Sản phẩm: </span>{' '}
                {product?.shopId?.productCount}
              </p>

              <p className="text-sm  text-[#242424]">
                <span className="font-medium">Đánh giá: </span>
                {product?.shopId?.reviewCount}
              </p>
              <p className="text-sm  text-[#242424]">
                <span className="font-medium">Ngày tạo: </span>
                {dayjs(product?.shopId?.createdAt).format('DD-MM-YYYY')}
              </p>
            </div>
          </div>

          {/* <div className=" flex flex-row justify-between gap-4">
              <div className="flex justify-center text-sm">
                {review.content}
              </div>
            </div> */}
        </div>
      </div>
    </div>
  )
}

export default ShopPreview
