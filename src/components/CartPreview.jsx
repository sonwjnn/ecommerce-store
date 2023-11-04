import productApi from '@/apis/modules/product.api'
import { shorterString } from '@/utilities/constants'
import { useEffect, useState } from 'react'

const CartPreview = ({ cart }) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const getImage = async () => {
      const { response, err } = await productApi.getImage({
        imageName: cart.productImage,
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
      className="header__cart-list--have-items-item cursor-pointer p-2 pr-3 transition-all hover:bg-bg_page"
    >
      <span className="header__cart-list--have-items-item-wrap gap-2">
        <span className="header__cart-list--have-items-img ">
          <div
            className="h-[50px] min-w-[50px] bg-cover bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        </span>
        <span className="header__cart-list--have-items-decription text-base">
          {shorterString(cart.productName, 28)}
        </span>
      </span>
      <span className="header__cart-list--have-items-price text-base">
        đ{cart.productPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
      </span>
    </li>
  )
}

export default CartPreview
