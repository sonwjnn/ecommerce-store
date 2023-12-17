import { useState } from 'react'

const OrderItems = ({ order }) => {
  const [onRequest, setOnRequest] = useState(false)
  return (
    <>
      <div className="sm:grid-cols-order-3 md:grid-cols-order-4 hidden min-h-[40px]   w-full   grid-cols-order-2  rounded-md bg-white px-2 py-4 text-center text-sm font-medium text-gray-500 sm:grid md:px-6">
        <div className="hidden text-left sm:block">Tên đơn hàng</div>
        <div className="hidden md:block ">Trạng thái</div>
        <div className="hidden sm:block ">Số lượng</div>
        <div className="hidden sm:block">Tổng giá</div>
      </div>
      {order?.products.map(item => (
        <div
          key={item.id}
          className=" w-full  cursor-pointer rounded-md px-2 py-2 transition hover:bg-accent md:px-6"
        >
          <div className="sm:grid-cols-order-3 md:grid-cols-order-4 grid-cols-order-1 grid min-h-[56px]  items-center   ">
            <div className="group flex w-full  min-w-0 items-center gap-x-2">
              <div
                className="aspect-square h-[56px] min-w-[56px] bg-cover bg-center bg-no-repeat "
                style={{
                  backgroundImage: `url(${item?.imageUrl})`,
                }}
              ></div>
              <div className="flex flex-col gap-y-1   text-sm  text-gray-500">
                <span className="line-clamp-1 text-[#242424] md:line-clamp-2">
                  {item?.name}
                </span>
                <span className="text-[#242424]">{item?.price}</span>
                <span className="block text-[#242424] md:hidden">
                  <span className="font-medium text-gray-500">
                    Trạng thái:{' '}
                  </span>{' '}
                  {item?.status}
                </span>
                <span className="block text-[#242424] sm:hidden">
                  <span className="font-medium text-gray-500">Số lượng:</span>{' '}
                  {item?.quantity}
                </span>

                <span className="block text-[#242424] sm:hidden">
                  <span className="font-medium text-gray-500">Tổng: </span>{' '}
                  {item?.totalPrice}
                </span>
              </div>
            </div>

            <div className="hidden text-center text-sm text-[#242424] md:block">
              {item?.status}
            </div>
            <div className="hidden text-center text-sm text-[#242424] sm:block">
              {item?.quantity}
            </div>

            <div className="hidden text-center text-sm text-[#242424] sm:block">
              {item?.totalPrice}
            </div>

            {/* <Button
              className="mx-auto border-none"
              variant="outline"
              size="icon"
              // disable={onRequest}
              // onClick={onRemove}
            >
              {onRequest ? (
                <Spinner className="text-primary" />
              ) : (
                <LuTrash className="text-secondary" size={20} />
              )}
            </Button> */}
          </div>
        </div>
      ))}
    </>
  )
}

export default OrderItems
