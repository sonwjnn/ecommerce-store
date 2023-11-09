import cartApi from '@/apis/modules/cart.api'
import productApi from '@/apis/modules/product.api'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  removeCart,
  removeCarts,
  updateQuantityCart,
} from '@/redux/features/userSlice'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { LuMinus, LuPlus, LuTrash } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

export const CartItem = props => {
  const {
    title,
    imageName,
    type,
    quantity,
    id,
    price,
    onRemoved,
    handleCheckedCart,
    isCheckedAll,
    productId,
    handleDotPrice,
  } = props

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const inputRef = useRef()
  const [isChecked, setIsChecked] = useState(false)
  const [onRequest, setOnRequest] = useState(false)
  const [cartValue, setCartValue] = useState(1)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const getImage = async () => {
      const { response, err } = await productApi.getImage({ imageName })

      if (err) toast.error(err.message)
      if (response) {
        setImageUrl(`data:image/png;base64,${response}`)
      }
    }

    getImage()
  }, [])

  useEffect(() => {
    setCartValue(+quantity)
  }, [quantity])

  useEffect(() => {
    if (isChecked) {
      const currPrice = +price * cartValue
      handleCheckedCart({ id, currPrice, isCartValue: true })
    }
  }, [cartValue])

  const handleChangeQuantity = async () => {
    const body = {
      cartId: id,
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
    setCartValue(prev => prev + 1)
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
    setCartValue(prev => (prev - 1 < 1 ? 1 : prev - 1))
    if (isUpdate) {
      debouncedCallback()
    }
  }

  const handleCheckCart = () => {
    setIsChecked(!isChecked)
    const currPrice = +price * cartValue
    handleCheckedCart({ id, currPrice }, !isChecked)
  }

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)
    const { response, err } = await cartApi.remove({
      cartId: id,
    })
    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      dispatch(removeCart({ cartId: id }))
      onRemoved({ id })
      toast.success('Remove cart success!')
    }
  }

  let prevPrice = price && handleDotPrice(price)
  let currPrice = price && handleDotPrice((+price * cartValue).toString())

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
            onClick={() => navigate(`/products/detail/${productId}`)}
            className="aspect-square h-[80px] w-[80px] bg-cover bg-center bg-no-repeat md:h-[56px] md:w-[56px] "
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
          <div className="flex flex-col justify-center gap-y-4 md:gap-y-0 ">
            <div
              onClick={() => navigate(`/products/detail/${productId}`)}
              className="line-clamp-2 text-base text-gray-500 group-hover:underline md:text-sm"
            >
              {title}
            </div>
            {/* <div className="text-sm">{type}</div> */}
            <div className="text-left text-base text-primary md:hidden">
              ₫{currPrice}
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
          ₫{prevPrice}
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
          ₫{currPrice}
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

const CartList = () => {
  const dispatch = useDispatch()
  const [carts, setCarts] = useState([])
  const [isCheckedAll, setCheckedAll] = useState(false)
  const [checkedCarts, setCheckedCarts] = useState([])
  const [onRequest, setOnRequest] = useState(false)

  const { listCarts } = useSelector(state => state.user)

  useEffect(() => {
    setCarts(listCarts)
  }, [])

  const onRemoved = ({ id, ids }) => {
    if (id) {
      const newCarts = [...carts].filter(e => e._id !== id)
      setCarts(newCarts)
    } else if (ids) {
      let newCarts = [...carts].filter(e => !ids.includes(e._id))
      setCarts(newCarts)
    }
  }

  useEffect(() => {
    if (isCheckedAll) {
      setCheckedCarts(carts.map(cart => cart._id))
    } else {
      setCheckedCarts([])
    }
  }, [isCheckedAll])

  const handleCheckedCart = ({ id, currPrice, isCartValue }, isChecked) => {
    if (isCartValue) {
      let checkedCartChange = checkedCarts.find(item => item.id === id)
      if (checkedCartChange) {
        checkedCartChange.currPrice = currPrice
        let newCheckedCarts = checkedCarts.slice()

        setCheckedCarts(newCheckedCarts)
      }
      return
    }
    if (isChecked) {
      setCheckedCarts([...checkedCarts, { id, currPrice }])
    } else {
      setCheckedCarts(checkedCarts.filter(item => item.id !== id))
    }
  }

  const onCheckedAll = () => {
    setCheckedAll(!isCheckedAll)
  }

  const onCheckRemoved = ids => {
    let newCarts = [...carts]
    ids.forEach(id => {
      newCarts.filter(e => e._id !== id)
    })
    setCarts(newCarts)
  }
  const handleDotPrice = price => {
    return price?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const handleRemoveCarts = async () => {
    if (!checkedCarts.length || onRequest) return
    setOnRequest(true)
    const newCheckedCarts = checkedCarts.map(item => item.id)
    const { response, err } = await cartApi.removeCarts({
      cartIds: newCheckedCarts,
    })
    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      dispatch(removeCarts({ cartIds: newCheckedCarts }))
      onRemoved({ ids: newCheckedCarts })
      setCheckedCarts([])
      toast.success('Remove carts success!')
    }
  }

  return (
    <div className="bg-bg_page">
      <header className="flex h-[85px] items-center justify-between bg-white px-16 py-6 sm:px-24">
        <div className="mx-auto flex items-center md:mx-0">
          <span className="ml-4 mt-4 h-full text-[22px] font-normal text-gray-400">
            Giỏ Hàng
          </span>
        </div>

        <div className="help hidden cursor-pointer text-base text-primary underline md:block">
          Bạn cần giúp đỡ ?
        </div>
      </header>

      <div className="min-h-screen w-full ">
        <div className=" mx-auto h-full max-w-[1200px] overflow-hidden ">
          <div className="mt-12 hidden min-h-[40px]  w-full   grid-cols-list-6  rounded-md  bg-white px-6 py-4 text-base text-gray-500 md:grid">
            <div></div>
            <div>Tất cả sản phẩm</div>

            <div className="text-center">Đơn giá</div>
            <div className="text-center">Số lượng</div>
            <div className="text-center">Số tiền</div>
            <div className="text-center">Thao tác</div>
          </div>

          <div className="mt-4 h-full min-h-[40vh] w-full rounded-md bg-white py-4">
            {carts.map(cart => (
              <CartItem
                id={cart._id}
                key={cart._id}
                userId={cart.user}
                productId={cart.productId._id}
                price={cart.productId.discountPrice}
                title={cart.productId.name}
                type={cart.productId.type}
                imageName={cart.productId.imageName}
                quantity={cart.quantity}
                onRemoved={onRemoved}
                onCheckRemoved={onCheckRemoved}
                handleCheckedCart={handleCheckedCart}
                isCheckedAll={isCheckedAll}
                checkedCarts={checkedCarts}
                handleDotPrice={handleDotPrice}
              />
            ))}
          </div>

          <div className="sticky bottom-0 mb-20 mt-4 hidden h-full w-full rounded-md bg-white md:block">
            <div className="flex items-center justify-between p-4 lg:p-8">
              <div className="flex items-center gap-4 text-sm lg:text-[17px]">
                <button
                  className="btn-cart-solid pointer-events-none select-none"
                  onClick={onCheckedAll}
                >
                  Chọn tất cả ({carts.length})
                </button>
                <button className="btn-cart-solid" onClick={handleRemoveCarts}>
                  Xoá đã chọn
                </button>
                <button className="btn-cart-solid">Thêm đã thích</button>
              </div>

              <div className="flex items-center gap-8 ">
                <span className="text-sm text-gray-500 lg:text-[17px]">
                  Tổng thanh toán ({checkedCarts.length} sản phẩm):
                </span>
                <span className="flex items-start text-xl font-semibold text-primary  lg:text-2xl">
                  <span className="mt-2 text-base">₫</span>
                  {handleDotPrice(
                    checkedCarts
                      .reduce(
                        (currValue, item) => item.currPrice + currValue,
                        0
                      )
                      .toString()
                  )}
                </span>
                <Button
                  variant="secondary"
                  className="px-12 py-3 capitalize lg:px-8 lg:py-4"
                >
                  mua hàng
                </Button>
              </div>
            </div>
          </div>

          <div className="bottom-0 mb-20 mt-4 h-full w-full rounded-md bg-white md:hidden">
            <div className="flex items-center justify-between  pl-2">
              <div className="flex items-center text-sm">
                <button className="btn-cart-solid p-0" onClick={onCheckedAll}>
                  Tất cả
                </button>
              </div>

              <div className="flex items-center gap-2 ">
                <span className="text-[13px] text-gray-500">
                  Tổng thanh toán:
                </span>
                <span className="text-base font-semibold text-primary">
                  ₫52.000
                </span>
                <Button variant="secondary">Mua hàng</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartList
