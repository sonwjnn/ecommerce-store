import orderApi from '@/apis/modules/order.api'
import { formatPriceToVND } from '@/utilities/constants'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { LuTrash } from 'react-icons/lu'
import { useDispatch } from 'react-redux'

import NotFound from './NotFound'
import { Spinner } from './Spinner'
import { Button } from './ui/button'

const OrderItem = ({ order, onRemoved }) => {
  const [onRequest, setOnRequest] = useState(false)

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)

    const { response, err } = await orderApi.remove({
      orderId: order?.id,
    })
    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      // dispatch(removeOrder({ orderId: order?.id }))
      onRemoved({ id: order?.id })
      toast.success('Remove favorite success!')
    }
  }

  return (
    <div className="border-b-gray-2006 w-full border-b px-2 py-2 md:px-6">
      <div className=" grid min-h-[56px] grid-cols-list-3  items-center   ">
        <div className="group flex w-full  min-w-0 items-center gap-x-2">
          <div className="line-clamp-2 text-base text-[#242424]  md:text-sm">
            {order?.products}
          </div>
        </div>

        <div className="text-center text-sm text-[#242424]">
          {order?.totalPrice}
        </div>

        <Button
          className="mx-auto border-none"
          variant="outline"
          size="icon"
          disable={onRequest}
          onClick={onRemove}
        >
          {onRequest ? (
            <Spinner className="text-primary" />
          ) : (
            <LuTrash className="text-secondary" size={20} />
          )}
        </Button>
      </div>
    </div>
  )
}

const PurchaseList = () => {
  const [orders, setOrders] = useState([])
  const [formatedOrders, setFormatedOrders] = useState([])
  const dispatch = useDispatch()
  const [onLoading, setLoading] = useState(false)

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true)
      const { response, err } = await orderApi.getList()
      setLoading(false)

      if (err) toast.error(err.message)
      if (response) {
        setOrders(response)
      }
    }
    getOrders()
  }, [dispatch])

  useEffect(() => {
    const formattedOrders = orders.map(item => ({
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: item.orderItems
        .map(orderItem => orderItem.productId.name)
        .join(', '),
      totalPrice: formatPriceToVND(
        item.orderItems.reduce((total, item) => {
          return total + Number(item.productId.discountPrice) * +item.quantity
        }, 0)
      ),
      isPaid: item.isPaid,
    }))
    setFormatedOrders(formattedOrders)
  }, [orders])

  const onRemoved = ({ id }) => {
    if (id) {
      const newOrders = [...orders].filter(e => e._id !== id)
      setOrders(newOrders)
    }
  }

  return (
    <div className="flex min-h-[50vh] w-full ">
      <div className="flex w-full   flex-col ">
        <div className=" h-full min-h-[40vh] w-full rounded-md bg-white py-4">
          {onLoading ? (
            <Spinner size="icon" />
          ) : (
            <>
              {formatedOrders.length ? (
                <>
                  <div className=" grid  min-h-[40px]   w-full  grid-cols-list-3  rounded-md bg-white px-2 py-4 text-base text-gray-500 md:px-6">
                    <div>Tên sản phẩm</div>
                    <div className="text-center">Số tiền</div>
                    <div className="text-center">Huỷ đơn</div>
                  </div>
                  {formatedOrders.map(order => (
                    <OrderItem
                      key={order.id}
                      order={order}
                      onRemoved={onRemoved}
                    />
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-y-4">
                  <NotFound text={'Bạn chưa có đơn hàng nào'} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PurchaseList
