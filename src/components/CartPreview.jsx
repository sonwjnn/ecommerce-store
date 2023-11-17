import productApi from '@/apis/modules/product.api'
import { formatPriceToVND } from '@/utilities/constants'
import { useEffect, useState } from 'react'

import { Alert } from './Alert'

const CartPreview = ({ cart }) => {
  const [imageUrl, setImageUrl] = useState('')

  if (!cart) return <Alert type="wrong" />

  const { imageName, discountPrice, name } = cart.productId

  useEffect(() => {
    const getImage = async () => {
      const { response, err } = await productApi.getImage({
        imageName,
      })

      if (err) toast.error(err.message)
      if (response) {
        setImageUrl(`data:image/png;base64,${response}`)
      }
    }

    getImage()
  }, [])

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
              backgroundImage: `url(${imageUrl})`,
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
