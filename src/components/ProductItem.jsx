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

  const navigate = useNavigate()

  return (
    <div className={twMerge('group', className)}>
      <div
        className="home-product-item cursor-pointer"
        onClick={() => navigate(`/products/detail/${product.id}`)}
      >
        <div className="h-full w-full overflow-hidden">
          <div
            className="home-product-item__img   bg-cover bg-center bg-no-repeat transition-all group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        </div>
        {/* <img src={imageUrl} alt="Product" /> */}
        <div className="home-product-item__title line-clamp-2 min-h-[32px]  pb-0 text-xs">
          {product.name}
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

          <span className="home-product-item__sale-price text-base text-secondary">
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
            }) && <AiFillHeart className="text-[13px] text-secondary" />}
          </span>
          <span className="home-product-item__rate flex items-center">
            <Star stars={product.rating} className="text-[11px]" />
            <span className="home-product-item__buy-num text-xs">
              Đã bán 989
            </span>
          </span>
        </div>
        <div className="home-product-item__location text-xs">
          TP. Hồ Chí Minh
        </div>
        {+product.favorites > 1 && (
          <div className="home-product-item__love bg-secondary text-sm">
            <span>Yêu thích</span>
          </div>
        )}
        {product.discount && product.discount !== '0' && (
          <div className="home-product-item__sale-off-percent">
            <span className="home-product-item__percent text-xs">
              {product.discount}%
            </span>
            <span className="home-product-item__up text-xs">GIẢM</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductItem
