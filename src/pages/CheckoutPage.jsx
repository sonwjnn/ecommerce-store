import orderApi from '@/apis/modules/order.api'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { clearCheckedCarts } from '@/redux/features/userSlice'
import { SHIPPING_PRICE, formatPriceToVND } from '@/utilities/constants'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCircleCheck } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, checkedCarts } = useSelector(state => state.user)
  const [onRequest, setOnRequest] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const orderId = queryParams.get('orderId')
  const canceled = queryParams.get('canceled')
  const success = queryParams.get('success')

  const handlePayment = async () => {
    if (!user?.address || !user?.district || !user?.city) {
      toast.error('You must add your address first!', {
        toastId: 'warning-address',
      })
      return navigate('/user/account/profile')
    }

    if (!checkedCarts?.length) {
      toast.error('You must choose at least one product!')
      return
    }
    if (onRequest) return

    setOnRequest(true)

    const body = {
      products: checkedCarts?.map(product => ({
        productId: product.productId.id,
        images: product.productId.images,
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
      dispatch(clearCheckedCarts())
    }
  }, [success, canceled])

  return (
    <Container>
      <Heading title={'Thanh toán'} description={'Thanh toán đơn hàng.'} />
      {success || canceled ? (
        <div className="mt-4 flex min-h-[40vh] flex-col items-center gap-y-3">
          <div className="flex items-center gap-x-2">
            <div className="text-xl">Bạn đã đặt hàng thành công</div>
            <FaCircleCheck size={20} className="text-green-500" />
          </div>
          <p className="text-sm text-gray-500">
            Order{' '}
            <span
              className=" cursor-pointer font-medium transition hover:text-[#242424]"
              onClick={() => navigate(`/order/${orderId}`)}
            >
              #{orderId}
            </span>{' '}
            đã được tạo
          </p>
          <div className="flex gap-x-2">
            <Link to={`/order/${orderId}`}>
              <Button variant="outline">Quản lý đơn hàng</Button>
            </Link>
            <Link to={'/user/carts'}>
              <Button variant="outline">Tiếp tục mua hàng</Button>
            </Link>
          </div>
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
              {checkedCarts.map((product, index) => (
                <div key={index} className="w-full px-2 py-2 md:px-6">
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
                  {checkedCarts.length || 0} sản phẩm
                </div>

                <div className="flex items-center gap-x-2">
                  <span className="text-base text-gray-500 ">Tổng phụ :</span>
                  <span className="flex items-start text-sm font-medium text-[#242424]  lg:text-base">
                    {formatPriceToVND(
                      checkedCarts.reduce(
                        (currValue, item) => item.totalPrice + currValue,
                        0
                      )
                    )}
                  </span>
                </div>

                <div className="flex  gap-x-2">
                  <span className="text-base text-gray-500 ">Vận chuyển :</span>

                  <RadioGroup defaultValue={SHIPPING_PRICE[0].price}>
                    {SHIPPING_PRICE.map(item => (
                      <div
                        key={item.name}
                        className="flex  items-center space-x-2"
                      >
                        <RadioGroupItem value={item.price} id={item.name} />
                        <Label htmlFor={item.name}>{item.name}</Label>
                        <Label className="ml-auto" htmlFor={item.name}>
                          {formatPriceToVND(item.price)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex items-center gap-x-2">
                  <span className="text-base text-gray-500 ">Tổng tiền :</span>
                  <span className="flex items-start text-xl font-semibold text-primary  lg:text-2xl">
                    {formatPriceToVND(
                      checkedCarts.reduce(
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
                disable={onRequest}
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
    </Container>
  )
}

export default CheckoutPage
