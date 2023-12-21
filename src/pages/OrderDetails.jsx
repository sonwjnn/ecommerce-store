import orderApi from '@/apis/modules/order.api'
import { Skeleton } from '@/components/ui/skeleton'
import { removeOrder } from '@/redux/features/userSlice'
import { formatPriceToVND } from '@/utilities/constants'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiArrowBack } from 'react-icons/bi'
import { LuTrash } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import OrderItems from '../components/OrderItems'
import { Spinner } from '../components/spinner'
import { Button } from '../components/ui/button'

const OrderDetails = () => {
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

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)

    const { response, err } = await orderApi.remove({
      orderId: order?.id,
    })
    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      dispatch(removeOrder({ orderId: order?.id }))
      toast.success('Remove order success!')
      navigate('/user/orders')
    }
  }

  const onBack = () => {
    navigate('/user/orders')
  }

  return (
    <div className="mx-auto mt-[100px] flex min-h-screen flex-col gap-y-4 md:mt-[150px] lg:max-w-[930px] xl:max-w-[1280px]">
      <span className="ml-4 mt-4 h-full text-xl font-medium capitalize text-[#242424]">
        chi tiết đơn hàng
      </span>
      <div className="rounded-md bg-white px-4 pb-4 pt-2">
        <div className="mb-4 flex items-center justify-between border-b border-b-gray-200">
          {order ? (
            <>
              <h2 className="mb-0 line-clamp-1 text-lg font-medium text-[#242424]">
                Mã đơn hàng
              </h2>
              <Button className="min-w-[120px]" variant="link" onClick={onBack}>
                <BiArrowBack className="mr-2" size={20} />
                <p>Quay lại</p>
              </Button>
            </>
          ) : (
            <div className="mb-2 flex w-full justify-between">
              <Skeleton className="h-[28px] w-[200px]" />
              <Skeleton className="h-[28px] w-[200px]" />
            </div>
          )}
        </div>

        <div className=" flex flex-col sm:flex-row">
          <div className="grid grid-cols-order-2-2 ">
            {order ? (
              <>
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
              </>
            ) : (
              <>
                <div className="flex flex-col gap-y-2">
                  <Skeleton className="h-[20px] w-[80px]" />
                  <Skeleton className="h-[20px] w-[80px]" />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Skeleton className="h-[20px] w-[200px]" />
                  <Skeleton className="h-[20px] w-[200px]" />
                </div>
              </>
            )}
          </div>
          <div className="mt-2 w-full sm:mt-0 sm:w-[200px]">
            {order ? (
              <Button
                className="w-full  border-secondary bg-background text-secondary hover:border-secondary/90  hover:text-secondary/90"
                variant="outline"
                disable={onRequest}
                onClick={onRemove}
              >
                {onRequest ? (
                  <Spinner className="text-primary" />
                ) : (
                  <div className="flex gap-x-1">
                    <LuTrash className=" text-secondary" size={16} /> Xoá đơn
                    hàng
                  </div>
                )}
              </Button>
            ) : (
              <Skeleton className="h-[48px] w-full" />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-[66%] rounded-md bg-white px-4 pb-4 pt-2">
          {order ? (
            <h2 className="mb-4 border-b border-b-gray-200 py-2 text-lg font-medium text-[#242424]">
              Tất cả sản phẩm
            </h2>
          ) : (
            <div className="w-full border-b border-b-gray-200">
              <Skeleton className="mb-2 h-[28px] w-[200px]" />
            </div>
          )}
          {order ? (
            <OrderItems order={order} />
          ) : (
            <div className="mt-2 flex flex-col gap-y-2">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className=" w-full  cursor-pointer rounded-md px-2 py-2 transition hover:bg-accent md:px-6"
                  >
                    <div className="flex  w-full  min-w-0  gap-x-2 ">
                      <Skeleton className="aspect-square h-[56px] w-[56px]" />
                      <div className="flex w-full flex-col  gap-y-1 text-sm  text-gray-500">
                        <Skeleton className="h-[20px] w-full" />
                        <Skeleton className="h-[20px] w-[50%]" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="flex-[33%] gap-y-2 rounded-md bg-white px-4 pb-4 pt-2">
          {order ? (
            <h2 className="mb-4 border-b border-b-gray-200 py-2 text-lg font-medium text-[#242424]">
              Thanh toán
            </h2>
          ) : (
            <div className="w-full border-b border-b-gray-200">
              <Skeleton className="mb-2 h-[28px] w-[200px] " />
            </div>
          )}
          {order ? (
            <>
              <div className=" flex items-center text-base md:text-sm">
                <p className=" font-medium capitalize text-gray-500">
                  Subtotal
                </p>
                <p className="ml-auto text-[#242424]">
                  {formatPriceToVND(order?.total)}
                </p>
              </div>

              <div className=" flex items-center text-base md:text-sm">
                <p className="font-medium capitalize text-gray-500">
                  Shipping & Handling
                </p>
                <p className="ml-auto text-[#242424]">{formatPriceToVND(0)}</p>
              </div>

              <div className=" flex items-center text-base md:text-sm">
                <p className="font-medium capitalize text-gray-500">
                  Tổng cộng
                </p>
                <p className=" ml-auto  text-[#242424]">
                  {formatPriceToVND(order?.total)}
                </p>
              </div>
            </>
          ) : (
            <div className="mt-4 flex flex-col gap-y-3">
              <Skeleton className="h-[20px] w-full" />
              <Skeleton className="h-[20px] w-[50%]" />
              <Skeleton className="h-[20px] w-full" />
              <Skeleton className="h-[20px] w-[70%]" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
