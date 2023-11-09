import reviewApi from '@/apis/modules/review.api'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import { routesGen } from '@/routes/routes'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const ReviewItem = ({ review, onRemoved }) => {
  const dispatch = useDispatch()

  const [onRequest, setOnRequest] = useState(false)

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)

    const { response, err } = await reviewApi.remove({
      reviewId: review._id,
    })
    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      toast.success('Remove review success!')
      onRemoved(review._id)
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        padding: 1,
        opacity: onRequest ? 0.6 : 1,
        '&:hover': { backgroundColor: 'background.paper' },
      }}
    >
      <Box sx={{ width: { xs: 0, md: '10%' } }}>
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
          style={{ color: 'unset', textDecoration: 'none' }}
        >
          <Box
            sx={{
              paddingTop: '160%',
              ...uiConfigs.style.backgroundImage(
                tmdbConfigs.posterPath(review.mediaPoster)
              ),
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '80%' },
          padding: { xs: 0, md: '0 2rem' },
        }}
      >
        <Stack spacing={1}>
          <Link
            to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
            style={{ color: 'unset', textDecoration: 'none' }}
          >
            <Typography
              variant="h6"
              sx={{ ...uiConfigs.style.typoLines(1, 'left') }}
            >
              {review.mediaTitle}
            </Typography>
          </Link>

          <Typography variant="caption">
            {dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:ss')}
          </Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>
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
          <LuTrash size={20} />
        )}
      </Button>
    </Box>
  )
}

const ReviewList = () => {
  const [reviews, setReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()

  const skip = 2

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await reviewApi.getList()
      dispatch(setGlobalLoading(false))

      if (err) toast.error(err.message)
      if (response) {
        setCount(response.length)
        setReviews([...response])
        setFilteredReviews([...response].splice(0, skip))
      }
    }
    getReviews()
  }, [])

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...reviews].splice(page * skip, skip),
    ])
    setPage(page + 1)
  }

  const onRemoved = id => {
    const newReviews = [...reviews].filter(e => e._id !== id)
    setReviews(newReviews)
    setFilteredReviews([...newReviews].splice(0, page * skip))
    setCount(page - 1)
  }
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your reviews (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map(review => (
            <Box key={review._id}>
              <ReviewItem review={review} onRemoved={onRemoved} />
              <Divider
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              />
            </Box>
          ))}
          {filteredReviews.length < reviews.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default ReviewList
