import orderApi from '@/services/api/modules/order.api'
import { formatPriceToVND } from '@/utils/formatting'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { LuTrash } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import NotFound from './NotFound'
import { Spinner } from './spinner'
import { Button } from './ui/button'
import { Heading } from './ui/heading'
import { Separator } from './ui/seperator'

const OrderItem = ({ order, onRemoved }) => {
  const [onRequest, setOnRequest] = useState(false)
  const navigate = useNavigate()

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
      toast.success('Remove order success!')
    }
  }

  return (
    <div className=" w-full  cursor-pointer rounded-md px-2 py-2 transition hover:bg-accent md:px-6">
      <div className=" grid min-h-[56px] grid-cols-list-3  items-center   ">
        <div
          onClick={() => navigate(`/order/${order?.id}`)}
          className="group flex w-full  min-w-0 items-center gap-x-2"
        >
          <div
            className="aspect-square h-[56px] min-w-[56px] bg-cover bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(${order?.thumbnail})`,
            }}
          ></div>
          <div className=" text-base  text-gray-500  md:text-sm">
            Order <span className="text-[#242424]">#{order?.id}</span> <br />
            Order on{' '}
            <span className="text-[#242424]">
              {new Date(order?.createdAt).toLocaleDateString()}{' '}
            </span>
          </div>
        </div>

        <div className="text-center text-sm text-[#242424]">
          {formatPriceToVND(order?.total)}
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

const OrderList = () => {
  const [formatedOrders, setFormatedOrders] = useState([])
  const [onLoading, setLoading] = useState(false)

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrderList = async () => {
      const { response, err } = await orderApi.getList()

      if (err) toast.error(err.message)
      if (response) {
        setOrders(response)
      }
    }

    getOrderList()
  }, [])

  useEffect(() => {
    if (orders.length) {
      const formattedOrders = orders.map(item => ({
        id: item.id,
        user: item.user,
        phone: item.phone,
        address: item.address,
        total: item.total,
        thumbnail: item.thumbnail,
        isPaid: item.isPaid,
        createdAt: item.createdAt,
      }))
      setFormatedOrders(formattedOrders)
    }
  }, [orders])

  const onRemoved = ({ id }) => {
    if (id) {
      const newOrders = [...orders].filter(e => e._id !== id)
      setOrders(newOrders)
    }
  }

  return (
    <>
      <Heading
        className={'py-0'}
        title="Đơn mua"
        description="Danh sách đơn mua của bạn."
      />
      <Separator />
      <div className="flex min-h-[50vh] w-full   flex-col ">
        <div className=" h-full min-h-[40vh] w-full rounded-md bg-white py-4">
          {onLoading ? (
            <Spinner size="icon" />
          ) : (
            <>
              {formatedOrders.length ? (
                <>
                  <div className=" grid  min-h-[40px]   w-full  grid-cols-list-3  rounded-md bg-white px-2 text-base text-gray-500 md:px-6">
                    <div>Tên đơn hàng</div>
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
    </>
  )
}

export default OrderList
