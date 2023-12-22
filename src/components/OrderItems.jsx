import orderApi from '@/apis/modules/order.api'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { LuTrash } from 'react-icons/lu'

import { Spinner } from './spinner'
import { Button } from './ui/button'

const OrderItem = ({ item }) => {
  const [onRequest, setOnRequest] = useState(false)

  const handleCancelItem = async itemId => {
    if (onRequest) return
    setOnRequest(true)

    const { response, err } = await orderApi.updateOrder({
      itemId,
      status: 'Cancelled',
    })
    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      // dispatch(removeOrder({ orderId: order?.id }))
      toast.success('Cancelled order item success!')
    }
  }
  return (
    <div
      key={item.id}
      className=" w-full  cursor-pointer rounded-md px-2 py-2 transition hover:bg-accent md:px-6"
    >
      <div className="grid min-h-[56px] grid-cols-order-1 items-center sm:grid-cols-order-3  md:grid-cols-order-4   ">
        <div className="group flex w-full  min-w-0 items-center gap-x-2 ">
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
              <span className="font-medium text-gray-500">Trạng thái: </span>{' '}
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
      </div>

      <div className="flex w-full justify-end">
        <Button
          className=" border-secondary text-secondary hover:border-secondary hover:text-secondary"
          variant="outline"
          disable={onRequest}
          onClick={() => handleCancelItem(item?.id)}
        >
          {onRequest ? (
            <Spinner className="text-primary" />
          ) : (
            <div className="flex gap-x-1">
              <LuTrash className=" text-secondary" size={16} /> Hủy
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}

const OrderItems = ({ order }) => {
  return (
    <>
      <div className="hidden min-h-[40px] w-full grid-cols-order-2   rounded-md   bg-white  px-2 py-4 text-center text-sm font-medium text-gray-500 sm:grid sm:grid-cols-order-3 md:grid-cols-order-4 md:px-6">
        <div className="hidden text-left sm:block">Tên đơn hàng</div>
        <div className="hidden md:block ">Trạng thái</div>
        <div className="hidden sm:block ">Số lượng</div>
        <div className="hidden sm:block">Tổng giá</div>
      </div>
      {order?.products.map(item => (
        <OrderItem key={item.id} item={item} />
      ))}
    </>
  )
}

export default OrderItems
