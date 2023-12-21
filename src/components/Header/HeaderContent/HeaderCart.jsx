import CartPreview from '@/components/CartPreview'
import NotFound from '@/components/NotFound'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { LuShoppingBag } from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HeaderCart = () => {
  const { user, listCarts } = useSelector(state => state.user)
  const navigate = useNavigate()
  const handleCarts = () => {
    if (user) {
      navigate('/user/carts')
    } else {
      toast.error('You must login first!', { toastId: 'warning-login' })
      navigate('/auth/signin')
    }
  }

  return (
    <div className="flex w-[80px] items-center justify-center ">
      <div
        onClick={handleCarts}
        className=" group relative flex cursor-pointer items-center"
      >
        <LuShoppingBag
          size={26}
          className=" text-primary group-hover:opacity-70"
        />
        <span className="pointer-events-none  absolute right-[-8px] top-[-8px] flex h-5 w-5 select-none items-center justify-center  rounded-full  bg-secondary  text-xs font-medium text-white">
          {listCarts.length}
        </span>

        <div className="hidden rounded-md">
          <div className="  mx-0 cursor-default  overflow-hidden px-[12px]">
            <div className="">Bạn chưa có sản phẩm nào.</div>
            <div className=" select-none py-4 ">
              <h3 className=" text-base font-medium text-[#242424]">
                Sản phẩm mới thêm
              </h3>
            </div>
            <div className=" max-h-[50vh] overflow-hidden">
              <ul className="">
                {Array.isArray(listCarts) && listCarts.length ? (
                  listCarts.map(cart => (
                    <CartPreview key={cart._id} cart={cart} />
                  ))
                ) : (
                  <NotFound text={'Giỏ hàng của bạn đang trống!'} />
                )}
              </ul>
            </div>
            <div className=" mt-2">
              <Button className="ml-auto" onClick={handleCarts}>
                Xem giỏ hàng
              </Button>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderCart
