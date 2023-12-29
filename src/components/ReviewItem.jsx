import reviewApi from '@/services/api/modules/review.api'
import { format } from 'date-fns'
import { useState } from 'react'
import { LuTrash } from 'react-icons/lu'
import { useSelector } from 'react-redux'

import { UserIcon } from './common/Icon'
import Star from './common/Star'
import { Spinner } from './common/spinner'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector(state => state.user)

  const [onRequest, setOnRequest] = useState(false)

  if (!review) {
    return null
  }

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)

    const { response, err } = await reviewApi.remove({ reviewId: review._id })

    setOnRequest(false)
    if (err) toast.error(err.message)
    if (response) onRemoved(review._id)
  }

  return (
    <div className="hover:bg-bg_page relative mb-2 rounded-md p-2">
      <div className="flex flex-row gap-4">
        {/* avatar */}
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
        {/* avatar */}

        <div className="flex grow flex-col justify-center gap-2">
          <div className="gap-1">
            <h6 className="text-sm font-medium">{review.user.name}</h6>
            <Star stars={review.rating} />
            <p className="text-[11px] text-gray-500">
              {format(review.createdAt, 'dd/MM/yyyy HH:mm:ss')}
            </p>
          </div>
          <div className=" flex flex-row justify-between gap-4">
            <div className="flex justify-center text-sm normal-case">
              {review.content}
            </div>
          </div>
        </div>

        {user?.id === review.user.id && (
          <Button
            className="border-none"
            variant="outline"
            size="icon"
            disable={onRequest}
            onClick={onRemove}
          >
            {onRequest ? (
              <Spinner className="text-primary" />
            ) : (
              <LuTrash className="text-secondary" size={20} />
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ReviewItem
