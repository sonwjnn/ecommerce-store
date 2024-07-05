import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { AiFillShop } from 'react-icons/ai'
import { LuStore } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

const ShopPreview = ({ product }) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/shops/${product?.shopId?._id}/all`)
  }
  return (
    <div className="flex min-h-[130px] w-full items-center rounded-md bg-white px-6 py-4">
      <div className="flex w-full flex-row items-center gap-4">
        <div className="flex aspect-square h-[80px] w-[80px] items-center justify-center">
          {product ? (
            <Avatar className="size-16">
              <AvatarImage src={product?.shopId?.imageUrl} />
              <AvatarFallback>
                <AiFillShop size={28} />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Skeleton className="h-full w-full rounded-full" />
          )}
        </div>

        <div className="flex  w-full flex-col justify-center gap-2">
          <h6 className="truncate text-base font-medium text-[#242424]">
            {product ? (
              product?.shopId?.title
            ) : (
              <Skeleton className="h-[28px] w-[200px]" />
            )}
          </h6>
          <div className="flex flex-col gap-3 lg:flex-row">
            {product ? (
              <Button
                onClick={onClick}
                variant="outline"
                className="min-w-[130px] border-primary px-3 text-primary"
              >
                <LuStore className="mr-2" />
                Xem Shop
              </Button>
            ) : (
              <Skeleton className="h-[40px] w-full md:w-[130px]" />
            )}
            <div className="flex flex-wrap  gap-x-4">
              {product ? (
                <>
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
                    {format(product?.shopId?.createdAt, 'dd/MM/yyyy')}
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-y-1">
                  <Skeleton className="h-[20px] w-full " />
                  <Skeleton className="h-[18px] w-full " />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPreview
