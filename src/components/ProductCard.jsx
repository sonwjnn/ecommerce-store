import { formatPriceToVND } from '@/utilities/constants'
import favoriteUtils from '@/utilities/favorite.utils'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import LikeButton from './LikeButton'
import Star from './Star'

const ProductCard = ({ product, className }) => {
  const [imageUrl, setImageUrl] = useState(product?.images[0].url)

  const navigate = useNavigate()

  const handleClick = () => {
    return navigate(`/products/detail/${product?.id}`)
  }

  const noImageUrl = new URL(
    `../assets/images/thumnails/no_image.jpg`,
    import.meta.url
  ).href

  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.onerror = () => setImageUrl(noImageUrl)
  }, [imageUrl, noImageUrl])

  return (
    <div
      className={twMerge(
        'relative cursor-pointer rounded-md border bg-white p-2 hover:shadow-md',
        className
      )}
    >
      <div onClick={handleClick}>
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
            {product?.discount > 0 ? (
              <span className="mr-1 bg-accent  text-xs font-medium text-gray-500">
                -{product?.discount}%
              </span>
            ) : null}
            {formatPriceToVND(product?.discountPrice)}
          </span>
          <span className="flex items-center justify-end gap-x-1">
            <Star stars={product?.rating} className="text-sm" />
            <span className=" line-clamp-1 text-xs text-[#242424]">
              Đã bán {product?.sold}
            </span>
          </span>
          <div className="text-right text-xs text-[#242424]">
            {product?.shopId?.city}
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 z-10  p-1 text-center">
        <LikeButton product={product} />
      </div>
    </div>
  )
}

export default ProductCard
