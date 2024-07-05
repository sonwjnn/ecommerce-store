import { Spinner } from '@/components/common/spinner'
import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/seperator'
import orderApi from '@/services/api/modules/order.api'
import { clearCheckedCarts } from '@/services/redux/features/userSlice'
import { PAYMENTS, SHIPPING_PRICE } from '@/utils/constants'
import { formatPriceToVND } from '@/utils/formatting'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaCircleCheck } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as z from 'zod'

const formSchema = z.object({
  shipping: z.coerce.number().min(0),
  payment: z.string().min(1, 'payment minimum 8 character'),
})

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, checkedCarts } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const orderId = queryParams.get('orderId')
  const canceled = queryParams.get('canceled')
  const success = queryParams.get('success')
  const [totalPrice, setTotalPrice] = useState(0)

  const defaultValues = {
    shipping: SHIPPING_PRICE[0].price,
    payment: PAYMENTS[0].value,
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const shipping = form.watch('shipping')

  const onSubmit = async values => {
    try {
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
      if (loading) return

      setLoading(true)

      const body = {
        products: checkedCarts?.map(product => ({
          productId: product.productId.id,
          images: product.productId.images,
          shopId: product.productId.shopId,
          name: product.productId.name,
          price: product.totalPrice,
          quantity: product.quantity,
        })),
        shippingPrice: values.shipping,
      }

      const { response } =
        values.payment === 'COD'
          ? await orderApi.addCOD(body)
          : await orderApi.add(body)

      if (response) {
        if (values.payment === 'COD') {
          navigate(`/checkout?orderId=${response?.id}&success=1`)
        } else {
          window.location.href = response?.url
        }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (success || canceled) {
      dispatch(clearCheckedCarts())
    }
  }, [success, canceled])

  useEffect(() => {
    if (shipping !== undefined) {
      setTotalPrice(
        checkedCarts.reduce(
          (currValue, item) => item.totalPrice + currValue,
          0
        ) + shipping
      )
    }
  }, [shipping])

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

                <div className="flex items-center justify-between pr-2">
                  <span className="text-sm font-medium text-[#242424]">
                    Số lượng sản phẩm:
                  </span>
                  <span className="flex items-start text-sm font-medium text-[#242424] ">
                    {checkedCarts.length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-x-2 pr-2">
                  <span className="text-sm font-medium text-[#242424]">
                    Tổng phụ :
                  </span>
                  <span className="flex items-start text-sm font-medium text-[#242424] ">
                    {formatPriceToVND(
                      checkedCarts.reduce(
                        (currValue, item) => item.totalPrice + currValue,
                        0
                      )
                    )}
                  </span>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="shipping"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vận chuyển:</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col justify-center gap-y-4 px-2"
                          >
                            {SHIPPING_PRICE.map(item => (
                              <FormItem
                                key={item.name}
                                className=" flex items-center gap-x-3"
                              >
                                <FormControl>
                                  <RadioGroupItem value={item.price} />
                                </FormControl>

                                <FormLabel
                                  className="!m-0 flex w-full items-center justify-between"
                                  htmlFor={item.name}
                                >
                                  <div>{item.name}</div>
                                  <div>{formatPriceToVND(item.price)}</div>
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="payment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phương thức thanh toán:</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col justify-center gap-y-4 px-2"
                          >
                            {PAYMENTS.map(item => (
                              <FormItem
                                key={item.name}
                                className=" flex items-center gap-x-3"
                              >
                                <FormControl>
                                  <RadioGroupItem value={item.value} />
                                </FormControl>

                                <FormLabel
                                  className="!m-0 flex w-full items-center "
                                  htmlFor={item.name}
                                >
                                  <div>{item.name}</div>
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="flex items-center justify-between gap-x-2 pr-2">
                    <span className="text-sm font-medium text-[#242424]">
                      Tổng tiền :
                    </span>
                    <span className="flex items-start text-xl font-semibold text-primary  lg:text-2xl">
                      {formatPriceToVND(totalPrice)}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-col gap-4">
                    <Button variant="secondary" type="submit" disable={loading}>
                      <div className="mr-2">
                        {loading ? <Spinner size="lg" /> : ''}
                      </div>
                      Đặt hàng
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

export default CheckoutPage
