import productApi from '@/apis/modules/product.api'
import favoriteUtils from '@/utilities/favorite.utils'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import Star from './Star'

const ProductItem = ({ product, className }) => {
  const [imageUrl, setImageUrl] = useState('')
  const { listFavorites } = useSelector(state => state.user)

  useEffect(() => {
    const getImage = async () => {
      const { response, err } = await productApi.getImage({
        imageName: product.imageName,
      })

      if (err) toast.error(err.message)
      if (response) {
        setImageUrl(`data:image/png;base64,${response}`)
      } else {
        setImageUrl(
          new URL('@/assets/img/thumnails/no_image.jpg', import.meta.url).href
        )
      }
    }

    getImage()
  }, [])

  const history = useNavigate()

  const productDetail = () => {
    history(`/products/detail/${product.id}`)
  }
  return (
    <div className={twMerge(className)}>
      <div className="home-product-item cursor-pointer" onClick={productDetail}>
        <div
          className="home-product-item__img bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        {/* <img src={imageUrl} alt="Product" /> */}
        <h2 className="home-product-item__title text-sm">{product.name}</h2>
        <div className="home-product-item__tag-red mt-0 text-[10px]">
          Mua 3 & giảm 5%
        </div>
        <div className="home-product-item__price flex-nowrap">
          {product.discount && product.discount !== '0' && (
            <span className="home-product-item__sale-price mr-1 min-w-0 truncate text-sm text-gray-500 line-through">
              <a href="" className="text-sm text-gray-500">
                đ
              </a>
              {product.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </span>
          )}

          <span className="home-product-item__sale-price text-base ">
            <a href="" className="text-sm">
              đ
            </a>
            {product.discountPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </span>
        </div>
        <div className="home-product-item__action items-center">
          <span className="home-product-item__favorite home-product-item__favorite--liked">
            {favoriteUtils.check({
              listFavorites,
              productId: product.id,
            }) && <AiFillHeart className="text-[13px] text-red-600" />}
          </span>
          <span className="home-product-item__rate flex items-center">
            <Star stars={product.rating} className="text-[11px]" />
            <span className="home-product-item__buy-num text-[12px]">
              Đã bán 989
            </span>
          </span>
        </div>
        <div className="home-product-item__location text-[12px]">
          TP. Hồ Chí Minh
        </div>
        {+product.favorites > 1 && (
          <div className="home-product-item__love">
            <span>Yêu thích</span>
          </div>
        )}
        {product.discount && product.discount !== '0' && (
          <div className="home-product-item__sale-off-percent">
            <span className="home-product-item__percent text-[12px]">
              {product.discount}%
            </span>
            <span className="home-product-item__up text-[12px]">GIẢM</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductItem
