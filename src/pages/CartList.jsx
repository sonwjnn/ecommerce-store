import cartApi from '@/apis/modules/cart.api'
import CartItem from '@/components/CartItem'
import { Button } from '@/components/ui/button'
import { removeCarts } from '@/redux/features/userSlice'
import { setOrder } from '@/redux/features/userSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CartList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const handleCheckedCart = (
    { id, currPrice, isCartValue, quantity, imageUrl, title, shopId },
    isChecked
  ) => {
    if (isCartValue) {
      let checkedCartChange = checkedCarts.find(item => item.id === id)
      if (checkedCartChange) {
        let newCheckedCarts = checkedCarts.slice()

        setCheckedCarts(newCheckedCarts)
      }
      return
    }
    if (isChecked) {
      setCheckedCarts([
        ...checkedCarts,
        { id, currPrice, quantity, imageUrl, title, shopId },
      ])
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

  const handleCheckout = () => {
    if (!checkedCarts.length) return
    dispatch(setOrder({ products: checkedCarts }))
    navigate('/checkout')
  }

  return (
    <div className="bg-accent">
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
          <h1 className="mt-4 px-2 py-4 text-2xl  font-medium text-[#242424] lg:mt-12">
            Giỏ Hàng
          </h1>
          <div className=" hidden min-h-[40px]  w-full   grid-cols-list-6  rounded-md  bg-white px-6 py-4 text-base text-gray-500 md:grid">
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
                shopId={cart.productId.shopId}
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
            <div className="grid grid-cols-cart-5 items-center p-4 lg:p-8">
              <button
                className="btn-cart-solid pointer-events-none select-none px-0"
                onClick={onCheckedAll}
              >
                Chọn tất cả ({carts.length})
              </button>
              <button className="btn-cart-solid" onClick={handleRemoveCarts}>
                Xoá đã chọn
              </button>
              <button className="btn-cart-solid">Thêm đã thích</button>

              <div className="mr-4 flex items-center justify-end gap-x-2">
                <span className=" text-sm text-gray-500 lg:text-[17px]">
                  Tổng tiền:
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
              </div>
              <Button
                onClick={handleCheckout}
                variant="secondary"
                className=" capitalize "
              >
                mua hàng {checkedCarts.length ? `(${checkedCarts.length})` : ''}
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
              <Button onClick={handleCheckout} variant="secondary">
                Mua hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartList
