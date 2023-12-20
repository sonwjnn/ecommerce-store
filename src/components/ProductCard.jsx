import { formatPriceToVND } from '@/utilities/constants'
import favoriteUtils from '@/utilities/favorite.utils'
import { useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import Star from './Star'
import { Skeleton } from './ui/skeleton'

const ProductCard = ({ product, className }) => {
  const { listFavorites } = useSelector(state => state.user)
  const [imageUrl, setImageUrl] = useState(product?.images[0].url)

  const navigate = useNavigate()

  const handleClick = () => {
    return navigate(`/products/detail/${product?.id}`)
  }

  const noImageUrl = new URL(
    `../assets/img/thumnails/no_image.jpg`,
    import.meta.url
  ).href

  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.onerror = () => setImageUrl(noImageUrl)
  }, [imageUrl, noImageUrl])

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        'relative cursor-pointer rounded-md border bg-white p-2 hover:shadow-md',
        className
      )}
    >
      <div className=" aspect-square overflow-hidden rounded-xl">
        <div
          className="home-product-item__img aspect-square rounded-md bg-contain  bg-center bg-no-repeat transition-all "
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
      </div>
      <div className="flex flex-col gap-y-2 px-1 pb-1">
        <div className="line-clamp-2  min-h-[32px]   text-sm font-medium text-[#242424]">
          {product?.name}
        </div>

        <span className="text-right text-base leading-6 text-secondary">
          {formatPriceToVND(product?.discountPrice)}
        </span>
        <div className="flex items-center justify-between">
          <span className="home-product-item__favorite home-product-item__favorite--liked">
            {favoriteUtils.check({
              listFavorites,
              productId: product?.id,
            }) && <AiFillHeart className="text-[13px] text-secondary" />}
          </span>
          <span className="flex items-center gap-x-1">
            <Star stars={product?.rating} className="text-xs" />
            <span className=" line-clamp-1 text-xs text-[#242424]">
              Đã bán {product?.sold}
            </span>
          </span>
        </div>
        <div className="text-right text-xs text-[#242424]">
          {product?.shopId?.city}
        </div>
        {product?.favorites > 1 && (
          <div className="home-product-item__love bg-secondary text-sm">
            <span>Yêu thích</span>
          </div>
        )}
        {product?.discount !== 0 && (
          <div className="home-product-item__sale-off-percent">
            <span className="home-product-item__percent text-xs font-medium text-[#242424]">
              -{product?.discount}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
