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
    <div className="header__cart ">
      <div
        onClick={handleCarts}
        className="header__cart-wrap group flex cursor-pointer items-center"
      >
        <LuShoppingBag
          size={26}
          className=" text-white group-hover:opacity-70"
        />
        <span className="pointer-events-none absolute right-[-4px] top-[-2px] flex h-5 w-5 select-none items-center justify-center  rounded-full border border-primary bg-secondary  text-xs font-medium text-white">
          {listCarts.length}
        </span>

        <div className="header__cart-list rounded-md">
          <div className="header__cart-list-container header__cart-list--have-items mx-0 cursor-default  overflow-hidden px-[12px]">
            <img
              src="/src/assets/img/no-items.png"
              alt=""
              className="header__cart-list--no-items-img"
            />
            <div className="header__cart-list--no-items-decription">
              Bạn chưa có sản phẩm nào.
            </div>
            <div className="header__cart-list--have-items-header select-none py-4 ">
              <h3 className="header__cart-list--have-items-title text-base">
                Sản phẩm mới thêm
              </h3>
            </div>
            <div className="header__cart-list--have-items-body max-h-[50vh] overflow-hidden">
              <ul className="header__cart-list--have-items-items">
                {Array.isArray(listCarts) && listCarts.length ? (
                  listCarts.map(cart => (
                    <CartPreview key={cart._id} cart={cart} />
                  ))
                ) : (
                  <NotFound text={'Giỏ hàng của bạn đang trống!'} />
                )}
              </ul>
            </div>
            <div className="header__cart-list--have-items-footer mt-2">
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
