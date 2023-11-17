import orderApi from '@/apis/modules/order.api'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { removeOrder } from '@/redux/features/userSlice'
import { formatPriceToVND } from '@/utilities/constants'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const { user, order } = useSelector(state => state.user)
  const [onRequest, setOnRequest] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const canceled = queryParams.get('canceled')
  const success = queryParams.get('success')

  const handlePayment = async () => {
    if (!user) {
      toast.error('You must login first!', { toastId: 'warning-login' })
      return navigate('/auth/signin')
    }

    if (!user.address || !user.district || !user.city) {
      toast.error('You must add your address first!', {
        toastId: 'warning-address',
      })
      return navigate('/user/account/profile')
    }

    if (!order?.products?.length) {
      toast.error('You must choose at least one product!')
      return
    }
    if (onRequest) return

    setOnRequest(true)

    const body = {
      products: order?.products?.map(product => ({
        productId: product.productId.id,
        shopId: product.productId.shopId,
        name: product.productId.name,
        price: product.totalPrice,
        quantity: product.quantity,
      })),
    }

    const { response, err } = await orderApi.add(body)

    setOnRequest(false)

    if (err) toast.error(err.message)

    if (response) {
      window.location = response.url
    }
  }

  useEffect(() => {
    if (success || canceled) {
      dispatch(removeOrder())
    }
  }, [success, canceled])

  return (
    <div className="min-w-screen bg-accent">
      <header className="flex h-[85px] items-center justify-between bg-white px-16 py-6 sm:px-24"></header>

      <div className=" mx-auto h-full max-w-[1200px] overflow-hidden">
        <h1 className="mt-4 px-2 py-4 text-2xl  font-medium text-[#242424] lg:mt-12">
          Thanh Toán
        </h1>
        {success || canceled ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Link to={'/user/carts'}>
              <Button variant="outline">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-[66%] flex-col">
              <div className=" grid  min-h-[40px]   w-full  grid-cols-list-3  rounded-md bg-white px-2 py-4 text-base text-gray-500 md:px-6">
                <div>Tất cả sản phẩm</div>
                <div className="text-center">Số lượng</div>
                <div className="text-center">Số tiền</div>
              </div>

              <div className="mt-4 h-full min-h-[40vh] w-full rounded-md bg-white py-4">
                {order?.products.map((product, index) => (
                  <div
                    key={index}
                    className="border-b-gray-2006 w-full border-b px-2 py-2 md:px-6"
                  >
                    <div className=" grid min-h-[56px] grid-cols-list-3  items-center   ">
                      <div className="group flex w-full  min-w-0 items-center gap-x-2">
                        <div
                          className="aspect-square h-[80px] w-[80px] bg-cover bg-center bg-no-repeat md:h-[56px] md:w-[56px] "
                          style={{
                            backgroundImage: `url(${product?.imageUrl})`,
                          }}
                        ></div>
                        <div className="line-clamp-2 text-base text-[#242424]  md:text-sm">
                          {product?.productId?.name}
                        </div>
                      </div>

                      <div className="text-center text-sm text-[#242424]">
                        {product?.quantity}
                      </div>
                      <div className="text-center text-sm text-[#242424]">
                        {formatPriceToVND(product?.totalPrice)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className=" w-full  flex-[33%] rounded-md ">
              <div className="flex flex-col items-center gap-8  rounded-md bg-white p-4">
                <div className="flex w-full flex-col gap-x-2 gap-y-4">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-medium capitalize text-[#242424]">
                      Đơn hàng
                    </h1>
                    <Link
                      to="/user/carts"
                      className="cursor-pointer text-sm text-primary hover:underline"
                    >
                      Thay đổi
                    </Link>
                  </div>

                  <div className="text-base text-gray-500">
                    {order?.products.length || 0} sản phẩm
                  </div>

                  <div className="flex items-center gap-x-2">
                    <span className="text-base text-gray-500 ">
                      Tổng tiền :
                    </span>
                    <span className="flex items-start text-xl font-semibold text-primary  lg:text-2xl">
                      {formatPriceToVND(
                        order?.products.reduce(
                          (currValue, item) => item.totalPrice + currValue,
                          0
                        )
                      )}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handlePayment}
                  variant="secondary"
                  className="w-full text-base capitalize"
                  disabled={onRequest}
                >
                  <div className="mr-2">
                    {onRequest ? <Spinner size="lg" /> : ''}
                  </div>
                  Đặt hàng
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage
