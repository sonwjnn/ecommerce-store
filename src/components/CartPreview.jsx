import { formatPriceToVND } from '@/utilities/constants'

import { Alert } from './Alert'

const CartPreview = ({ cart }) => {
  if (!cart) return <Alert type="wrong" />

  const { images, discountPrice, name } = cart?.productId

  return (
    <li
      key={cart._id}
      className="header__cart-list--have-items-item cursor-pointer rounded-sm p-2 pr-3 transition-all hover:bg-accent"
    >
      <span className="flex  gap-2">
        <span className=" header__cart-list--have-items-img m-0 h-[50px] min-w-[50px]">
          <div
            className="h-[50px] w-[50px] bg-cover bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(${images[0]?.url})`,
            }}
          ></div>
        </span>
        <span className="line-clamp-2 text-left text-base">{name}</span>
      </span>
      <span className="header__cart-list--have-items-price text-base text-secondary">
        {formatPriceToVND(discountPrice)}
      </span>
    </li>
  )
}

export default CartPreview
