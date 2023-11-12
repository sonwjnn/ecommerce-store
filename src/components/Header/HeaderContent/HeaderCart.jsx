import CartPreview from '@/components/CartPreview'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { CgShoppingCart } from 'react-icons/cg'
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
    <div className="header__cart">
      <div onClick={handleCarts} className="header__cart-wrap cursor-pointer">
        <CgShoppingCart size={28} className=" text-white" />
        <span className="header__cart-length  pointer-events-none select-none border-none bg-secondary text-xs text-white">
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
                {listCarts.length
                  ? listCarts.map(cart => (
                      <CartPreview key={cart._id} cart={cart} />
                    ))
                  : []}
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
