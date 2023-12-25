import cartApi from '@/apis/modules/cart.api'
import CartItem from '@/components/CartItem'
import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { removeCarts } from '@/redux/features/userSlice'
import { setCheckedCarts as setCheckedCartsStore } from '@/redux/features/userSlice'
import { formatPriceToVND } from '@/utilities/constants'
import { useCallback, useEffect, useState } from 'react'
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
  }, [listCarts])

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

  const updateCheckedCarts = (cart, isChecked) => {
    if (isChecked) {
      const existingCartIndex = checkedCarts.findIndex(
        item => item.id === cart.id
      )
      if (existingCartIndex !== -1) {
        return checkedCarts.map((item, index) =>
          index === existingCartIndex ? cart : item
        )
      } else {
        return [...checkedCarts, cart]
      }
    } else {
      return checkedCarts.filter(item => item.id !== cart.id)
    }
  }

  const handleCheckedCart = (cart, isChecked) => {
    setCheckedCarts(updateCheckedCarts(cart, isChecked))
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
    if (!checkedCarts.length) {
      toast.error('You must choose at least one product!')
      return
    }
    dispatch(setCheckedCartsStore(checkedCarts))
    navigate('/checkout')
  }

  const handlePrice = useCallback(() => {
    let price = 0
    checkedCarts.forEach(item => {
      price += item.totalPrice
    })
    return price
  }, [checkedCarts])

  return (
    <Container>
      <Heading title="Giỏ hàng" description={'Danh sách sản phẩm trong giỏ.'} />
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
            key={cart._id}
            cart={cart}
            onRemoved={onRemoved}
            onCheckRemoved={onCheckRemoved}
            handleCheckedCart={handleCheckedCart}
            isCheckedAll={isCheckedAll}
            checkedCarts={checkedCarts}
          />
        ))}
      </div>

      <div className="sticky bottom-0 mb-20 mt-4 h-full w-full rounded-md bg-white ">
        <div className="grid grid-cols-cart-5 items-center p-4 lg:p-8">
          <button
            className="btn-cart-solid pointer-events-none hidden select-none px-0 md:block"
            onClick={onCheckedAll}
          >
            Chọn tất cả ({carts.length})
          </button>
          <button
            className="btn-cart-solid hidden md:block"
            onClick={handleRemoveCarts}
          >
            Xoá đã chọn
          </button>
          <button className="btn-cart-solid hidden md:block">
            Thêm đã thích
          </button>

          <div className="mr-4 flex items-center justify-end gap-x-2">
            <span className=" text-sm text-gray-500 lg:text-[17px]">
              Tổng tiền:
            </span>
            <span className="flex items-start text-xl font-semibold text-primary  lg:text-2xl">
              {formatPriceToVND(handlePrice())}
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
    </Container>
  )
}

export default CartList
