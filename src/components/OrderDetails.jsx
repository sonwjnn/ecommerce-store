import orderApi from '@/apis/modules/order.api'
import { formatPriceToVND } from '@/utilities/constants'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import OrderItems from './OrderItems'
import { Button } from './ui/button'

// import OrderMeta from '../OrderMeta'
// import OrderSummary from '../OrderSummary'

const OrderDetails = props => {
  // const { order, user, cancelOrder, updateOrderItemStatus, onBack } = props
  const [onRequest, setOnRequest] = useState(false)
  const [order, setOrder] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orderId } = useParams()

  useEffect(() => {
    const getOrderDetail = async () => {
      const { response, err } = await orderApi.getDetail({ orderId })
      if (err) toast.error(err.message)
      if (response) {
        setOrder(response)
      }
    }
    getOrderDetail()
  }, [dispatch])

  // const onRemoved = ({ id }) => {
  //   if (id) {
  //     const newOrders = [...orders].filter(e => e._id !== id)
  //     setOrders(newOrders)
  //   }
  // }

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
      // onRemoved({ id: order?.id })
      toast.success('Remove order success!')
    }
  }

  const onBack = () => {
    navigate('/user/orders')
  }

  return (
    <div className="mx-auto mt-[100px] flex min-h-screen flex-col gap-y-4 md:mt-[150px] lg:max-w-[930px] xl:max-w-[1200px]">
      <div className="rounded-md bg-white px-4 py-2">
        <div className="mb-4 flex items-center justify-between border-b border-b-gray-200">
          <h2 className="mb-0 text-xl font-medium text-[#242424]">
            Chi tiết đơn hàng
          </h2>
          <Button variant="link" onClick={onBack}>
            <BiArrowBack className="mr-2" size={20} />
            <p>Quay lại</p>
          </Button>
        </div>

        <div className=" flex">
          <div className="grid-cols-order-2-2 grid ">
            <div className="text-sm text-gray-600">
              <p>Order ID</p>
              <p className="one-line-ellipsis">Order Date</p>
            </div>
            <div className="text-sm text-[#242424]">
              <div className="text-left">{` #${order?.id}`}</div>
              <div className="text-left">
                {new Date(order?.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div>
            <Button
              className="mx-auto min-w-[130px] border-secondary bg-background text-secondary hover:border-secondary/90 hover:bg-accent hover:text-secondary/90"
              variant="outline"
              disable={onRequest}
              onClick={onRemove}
            >
              {onRequest ? (
                <Spinner className="text-primary" />
              ) : (
                <div>Xoá đơn hàng</div>
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-[66%] rounded-md bg-white px-4 py-2 ">
          <h2 className="mb-4 border-b border-b-gray-200 py-2 text-xl font-medium text-[#242424]">
            Tất cả sản phẩm
          </h2>
          <OrderItems order={order} />
        </div>
        <div className="flex-[33%] gap-y-2 rounded-md bg-white px-4 py-2">
          <h2 className="mb-4 border-b border-b-gray-200 py-2 text-xl font-medium text-[#242424]">
            Thanh toán
          </h2>
          <div className=" flex items-center text-base md:text-sm">
            <p className=" font-medium capitalize text-gray-500">Subtotal</p>
            <p className="ml-auto text-[#242424]">
              {formatPriceToVND(order?.total)}
            </p>
          </div>
          {/* <div className="summary-item flex items-center">
              <p className="summary-label">Est. Sales Tax</p>
              <p className="summary-value ml-auto">${order.totalTax}</p>
            </div> */}

          <div className=" flex items-center text-base md:text-sm">
            <p className="font-medium capitalize text-gray-500">
              Shipping & Handling
            </p>
            <p className="ml-auto text-[#242424]">{formatPriceToVND(0)}</p>
          </div>

          <div className=" flex items-center text-base md:text-sm">
            <p className="font-medium capitalize text-gray-500">Tổng cộng</p>
            <p className=" ml-auto  text-[#242424]">
              {formatPriceToVND(order?.total)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
