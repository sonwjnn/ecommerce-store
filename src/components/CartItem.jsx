import cartApi from '@/apis/modules/cart.api'
import productApi from '@/apis/modules/product.api'
import { removeCart, updateQuantityCart } from '@/redux/features/userSlice'
import { formatPriceToVND } from '@/utilities/constants'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { LuMinus, LuPlus, LuTrash } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

import { Spinner } from './Spinner'
import { Button } from './ui/button'
import { Input } from './ui/input'

const CartItem = props => {
  const { cart, onRemoved, handleCheckedCart, isCheckedAll } = props

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const inputRef = useRef()
  const [isChecked, setIsChecked] = useState(false)
  const [onRequest, setOnRequest] = useState(false)
  const [cartValue, setCartValue] = useState(+cart?.quantity || 1)
  const [imageUrl, setImageUrl] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const getImage = async () => {
      const { response, err } = await productApi.getImage({
        imageName: cart?.productId?.imageName,
      })

      if (err) toast.error(err.message)
      if (response) {
        setImageUrl(`data:image/png;base64,${response}`)
      }
    }

    getImage()
  }, [])

  useEffect(() => {
    setTotalPrice(+cart?.productId?.discountPrice * cartValue)
  }, [cartValue])

  useEffect(() => {
    handleCheckedCart(
      { ...cart, totalPrice, imageUrl, quantity: cartValue },
      isChecked
    )
  }, [totalPrice])

  const handleChangeQuantity = async () => {
    const body = {
      cartId: cart?.id,
      quantity: cartValue,
    }

    const { response, err } = await cartApi.updateCart(body)

    if (err) toast.error(err.message)

    if (response) {
      dispatch(updateQuantityCart(body))
    }
  }

  const debouncedCallback = useDebouncedCallback(handleChangeQuantity, 500)

  const handleIncreaseQuantity = () => {
    setCartValue(prev => +prev + 1)
    debouncedCallback()
  }

  const handleInputQuantity = e => {
    const value = e.target.value

    if (value < 1) {
      setCartValue(1)
    } else if (value > 50) {
      setCartValue(50)
    } else {
      setCartValue(value)
    }

    debouncedCallback()
  }

  const handleDecreaseQuantity = () => {
    const isUpdate = cartValue - 1 < 1 ? false : true
    setCartValue(prev => (+prev - 1 < 1 ? 1 : +prev - 1))
    if (isUpdate) {
      debouncedCallback()
    }
  }

  const handleCheckCart = () => {
    setIsChecked(!isChecked)
    handleCheckedCart({ ...cart, totalPrice, imageUrl }, !isChecked)
  }

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)
    const { response, err } = await cartApi.remove({
      cartId: cart?.id,
    })
    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      dispatch(removeCart({ cartId: cart?.id }))
      onRemoved({ id: cart?.id })
      toast.success('Remove cart success!')
    }
  }

  return (
    <div className="border-b-gray-2006 w-full border-b px-6 py-2">
      <div className=" grid min-h-[56px] grid-cols-list-3  items-center   md:grid-cols-list-6">
        <input
          type="checkbox"
          checked={isChecked || isCheckedAll}
          ref={inputRef}
          className="h-4 w-4"
          onChange={handleCheckCart}
        />
        <div className="group flex cursor-pointer items-center gap-x-2">
          <div
            onClick={() => navigate(`/products/detail/${cart?.productId?._id}`)}
            className="aspect-square h-[80px] w-[80px] bg-cover bg-center bg-no-repeat md:h-[56px] md:w-[56px] "
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
          <div className="flex flex-col justify-center gap-y-4 md:gap-y-0 ">
            <div
              onClick={() =>
                navigate(`/products/detail/${cart?.productId?._id}`)
              }
              className="line-clamp-2 text-base text-gray-500 group-hover:underline md:text-sm"
            >
              {cart?.productId?.name}
            </div>
            {/* <div className="text-sm">{type}</div> */}
            <div className="text-left text-base text-primary md:hidden">
              ₫{}
            </div>
            <div className="flex items-center justify-start md:hidden">
              <button
                onClick={handleDecreaseQuantity}
                className="flex h-8 w-8 items-center justify-center rounded-l-md border border-neutral-300 bg-transparent outline-none"
              >
                <LuMinus />
              </button>
              <Input
                className="h-[32px] w-[50px] rounded-none border border-x-0 border-neutral-300 bg-white text-center text-base"
                type="number"
                value={cartValue}
                onChange={handleInputQuantity}
              />
              <button
                onClick={handleIncreaseQuantity}
                className="flex h-8 w-8 items-center justify-center rounded-r-md border border-neutral-300 bg-transparent outline-none"
              >
                <LuPlus />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden text-center text-sm text-gray-500 md:block">
          {formatPriceToVND(+cart?.productId?.discountPrice)}
        </div>

        <div className="hidden items-center justify-center md:flex">
          <button
            onClick={handleDecreaseQuantity}
            className="flex h-8 w-8 items-center justify-center rounded-l-md border border-neutral-300 bg-transparent outline-none"
          >
            <LuMinus />
          </button>
          <Input
            className="h-[32px] w-[50px] rounded-none border border-x-0 border-neutral-300 bg-white text-center text-base"
            type="number"
            value={cartValue}
            onChange={handleInputQuantity}
          />
          <button
            onClick={handleIncreaseQuantity}
            className="flex h-8 w-8 items-center justify-center rounded-r-md border border-neutral-300 bg-transparent outline-none"
          >
            <LuPlus />
          </button>
        </div>

        <div className="hidden text-center text-sm text-primary md:block">
          {formatPriceToVND(totalPrice)}
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

export default CartItem
