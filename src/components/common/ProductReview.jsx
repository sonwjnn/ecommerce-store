import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import reviewApi from '../../apis/modules/review.api'
import TextAvatar from './TextAvatar'
import { MdDelete } from 'react-icons/md'
import { FiSend } from 'react-icons/fi'
import LoadingButton from './LoadingButton'

const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector(state => state.user)

  const [onRequest, setOnRequest] = useState(false)

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)

    const { response, err } = await reviewApi.remove({ reviewId: review._id })

    setOnRequest(false)
    if (err) toast.error(err.message)
    if (response) onRemoved(review._id)
  }

  return (
    <div className="p-2 rounded-md relative hover:bg-bg_page mb-2">
      <div className="flex flex-row gap-4">
        {/* avatar */}
        <div className="h-[30px] w-[30px]">
          <TextAvatar text={review.user.name} />
        </div>
        {/* avatar */}

        <div className="gap-2 flex flex-col grow justify-center">
          <div className="gap-1">
            <h6 className="font-bold text-[16px]">{review.user.name}</h6>
            <p className="text-[11px] text-gray-500">
              {dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:ss')}
            </p>
          </div>
          <div className=" gap-4 flex flex-row justify-between">
            <div className="flex justify-center text-[14px]">
              {review.content}
            </div>
          </div>
          {user && user.id === review.user.id && (
            <LoadingButton
              loading={onRequest}
              colorLoading={'#fb5533'}
              variant={'contained'}
              className={`bg-transparent border-none text-red-600 mr-2 text-[24px] flex items-center px-3 py-2 justify-center sm:relative md:absolute sm:right-0 md:right-2`}
              onClick={onRemove}
            >
              <MdDelete />
            </LoadingButton>
          )}
        </div>
      </div>
    </div>
  )
}

const ProductReview = ({ reviews, product, reviewCount, setReviewCount }) => {
  const { user } = useSelector(state => state.user)

  const [listReviews, setListReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [page, setPage] = useState(1)
  const [onRequest, setOnRequest] = useState(false)
  const [content, setContent] = useState('')
  const [rate, setRate] = useState(0)

  const skip = 4

  useEffect(() => {
    setListReviews([...reviews])
    setFilteredReviews([...reviews].splice(0, skip))
    setReviewCount(reviews.length)
  }, [reviews])

  const onAddReview = async () => {
    if (onRequest) return
    const body = {
      productId: product._id,
      typeId: product.typeId._id,
      cateId: product.cateId._id,
      productName: product.name,
      productImage: product.imageName,
      rate,
      content
    }
    if (!rate) return
    if (!content.trim()) return

    setOnRequest(true)
    const { response, err } = await reviewApi.add(body)
    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      toast.success('Post review success')

      setFilteredReviews([...filteredReviews, response])
      setReviewCount(reviewCount + 1)
      setContent('')
    }
  }

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
      ,
    ])
    setPage(page + 1)
  }

  const onRemoved = id => {
    if (listReviews.findIndex(e => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter(e => e.id !== id)
      setListReviews(newListReviews)
      setFilteredReviews([...newListReviews].splice(0, page * skip))
    } else {
      setFilteredReviews([...filteredReviews].filter(e => e.id !== id))
    }

    setReviewCount(reviewCount - 1)

    toast.success('Remove review success')
  }

  return (
    <>
      <div>
        <div className="gap-4 mb-2 mt-4">
          {filteredReviews.map(item => (
            <div key={item._id}>
              <ReviewItem review={item} onRemoved={onRemoved} />
            </div>
          ))}
          {filteredReviews.length < listReviews.length && (
            <button onClick={onLoadMore}>load more</button>
          )}
        </div>
        {user && (
          <>
            <div className="flex flex-row gap-2 mt-2">
              <div className="w-[40px] h-[40px]">
                <TextAvatar text={user.name} />
              </div>
              <div className="flex gap-4 flex-col w-full">
                <h6 className="font-bold text-[16px]">{user.name}</h6>
                <div className="flex gap-3">
                  <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={4}
                    placeholder="Write your review"
                    className="grow p-4 border border-gray-300 resize-none text-[14px]"
                  />

                  <LoadingButton
                    loading={onRequest}
                    colorLoading={'#ffffff'}
                    variant={'contained'}
                    className={` flex items-center justify-center btn-primary py-2 px-12 h-[4rem]`}
                    onClick={onAddReview}
                  >
                    <FiSend className=" mt-1 text-[20px]" />
                  </LoadingButton>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ProductReview
