import { useEffect, useState } from 'react'
import { shorterString } from '../../utilities/constants'
import productApi from '../../apis/modules/product.api'

const CartPreview = ({ cart }) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const getImage = async () => {
      const { response, err } = await productApi.getImage({
        imageName: cart.productImage
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
      className="header__cart-list--have-items-item cursor-pointer hover:bg-bg_page transition-all p-2 pr-3"
    >
      <span className="header__cart-list--have-items-item-wrap gap-2">
        <span className="header__cart-list--have-items-img ">
          <div
            className="min-w-[50px] h-[50px] bg-no-repeat bg-center bg-cover "
            style={{
              backgroundImage: `url(${imageUrl})`
            }}
          ></div>
        </span>
        <span className="header__cart-list--have-items-decription">
          {shorterString(cart.productTitle, 28)}
        </span>
      </span>
      <span className="header__cart-list--have-items-price">
        đ{cart.productPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
      </span>
    </li>
  )
}

export default CartPreview
