import { formatPriceToVND } from '@/utils/formatting'
import { cn } from '@/utils/helpers'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import LikeButton from './common/LikeButton'
import Star from './common/Star'
import { LazyImage } from './ui/lazy-image'

const ProductCard = ({ product, className }) => {
  const navigate = useNavigate()
  const { listFavorites } = useSelector(state => state.user)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleClick = () => {
    return navigate(`/products/detail/${product?.id}`)
  }

  useEffect(() => {
    if (listFavorites.length) {
      const isFavorite = listFavorites.some(
        e => e.productId?._id === product?.id
      )

      setIsFavorite(isFavorite)
    }
  }, [listFavorites])

  return (
    <div
      className={twMerge(
        'group relative cursor-pointer rounded-lg border bg-white  hover:shadow-md',
        className
      )}
    >
      <div onClick={handleClick}>
        <div className=" aspect-square overflow-hidden rounded-t-lg">
          <LazyImage src={product?.images[0]?.url || ''} alt={product?.name} />
        </div>
        <div className="flex flex-col gap-y-2 px-3 pb-2 pt-1">
          <div className="line-clamp-2  min-h-[40px] text-pretty text-sm font-medium text-[#242424]">
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
            {product?.shopId?.city || product?.shop?.city}
          </div>
        </div>
      </div>
      <div className={cn('absolute right-0 top-0 z-10 p-1 text-center')}>
        <LikeButton
          className={cn('tr opacity-0 transition group-hover:opacity-100', {
            'opacity-100': isFavorite,
          })}
          product={{ ...product, isFavorite }}
          setIsFavorite={setIsFavorite}
          isFavorite={isFavorite}
        />
      </div>
    </div>
  )
}

export default ProductCard
