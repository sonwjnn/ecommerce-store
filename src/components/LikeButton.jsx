import favoriteApi from '@/services/api/modules/favorite.api'
import {
  addFavorite,
  removeFavorite,
} from '@/services/redux/features/userSlice'
import { cn } from '@/utils/helpers'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { HeartIcon } from './Icon'
import { CheckboxHeart } from './ui/checkbox-heart'

const LikeButton = ({ product, className, isFavorite, setIsFavorite }) => {
  const { user, listFavorites } = useSelector(state => state.user)

  const [onRequest, setOnRequest] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFavoriteClick = async () => {
    if (!user) {
      toast.error('You must login first!', { toastId: 'warning-login' })
      navigate('/auth/signin')
      return
    }
    if (onRequest) return
    if (isFavorite) {
      onRemoveFavorite()
      return
    }

    setOnRequest(true)

    const body = {
      productId: product?._id,
    }
    const { response, err } = await favoriteApi.add(body)
    if (err) toast.error(err.message)

    setOnRequest(false)

    if (response) {
      dispatch(
        addFavorite({
          ...response,
          productId: { ...product },
        })
      )
      setIsFavorite(true)
      toast.success('Add favorite success')
    }
  }

  const onRemoveFavorite = async () => {
    if (onRequest) return

    setOnRequest(true)
    const favorite = listFavorites.find(
      item => item.productId?._id === product?._id
    )

    const { response, err } = await favoriteApi.remove({
      favoriteId: favorite?.id,
    })

    setOnRequest(false)

    if (err) toast.error(err.message)

    if (response) {
      dispatch(removeFavorite({ favoriteId: favorite?.id }))
      setIsFavorite(false)
    }
  }
  return (
    <div className={cn('add-to-wishlist h-10 w-10 ', className)}>
      <CheckboxHeart
        id={
          window.location.pathname.includes('detail')
            ? `${product?._id}-detail`
            : `${product?._id}`
        }
        name={
          window.location.pathname.includes('detail')
            ? `${product?._id}-detail`
            : `${product?._id}`
        }
        disabled={onRequest}
        checked={isFavorite}
        label={<HeartIcon />}
        onChange={onFavoriteClick}
      />
    </div>
  )
}

export default LikeButton
