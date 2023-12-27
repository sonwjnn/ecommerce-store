import LikeButton from '@/components/LikeButton'
import ProductDescription from '@/components/ProductDescription'
import ProductInfo from '@/components/ProductInfo'
import ReviewImages from '@/components/ReviewImages'
import ReviewList from '@/components/ReviewList'
import ShopPreview from '@/components/ShopPreview'
import Container from '@/components/ui/container'
import { Skeleton } from '@/components/ui/skeleton'
import productApi from '@/services/api/modules/product.api'
import { socialNetworkLinks } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const [product, setProduct] = useState(null)

  const [favoriteCount, setFavoriteCount] = useState(0)
  const [reviews, setReviews] = useState([])
  const [starCount, setStarCount] = useState([])

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const getProduct = async () => {
      const { response, err } = await productApi.getDetail({
        productId,
      })

      if (response) {
        setProduct(response)
        setIsFavorite(response.isFavorite)
        setReviews(response.reviews)
      }

      if (err) toast.error(err.message)
    }

    getProduct()
  }, [dispatch])

  useEffect(() => {
    if (product && product.reviews) {
      let starCount = Array(6).fill(0)
      product.reviews.forEach(review => {
        starCount[review.rating]++
      })
      setStarCount(starCount)
    }
  }, [product])

  useEffect(() => {
    if (product && product.favorites) {
      setFavoriteCount(product.favorites.length)
    }
  }, [product])

  return (
    <Container className="mt-8">
      <div className="h-full space-y-6">
        <div className="h-full w-full  rounded-md ">
          <div className="flex flex-col gap-x-6 md:flex-row">
            <div className=" flex w-[20%] flex-col gap-y-6 lg:w-[33%] ">
              <div className="w-full  rounded-md bg-white p-4">
                <ReviewImages images={product?.images || []} />

                <div className="mt-2 hidden flex-wrap  items-center  justify-center gap-y-2 bg-white p-2 md:flex">
                  {product ? (
                    <div className="flex w-full justify-between">
                      <div className="flex items-center">
                        <h3 className="text-base">Chia sẻ:</h3>
                        <div className=" relative ml-4 flex gap-4 text-2xl ">
                          {socialNetworkLinks.map(item => {
                            const Icon = item.icon
                            return (
                              <a
                                className="flex items-center justify-center gap-x-2 rounded-full text-[#605f5f] hover:brightness-110"
                                key={item.title}
                                href={item.link}
                                target="_blank"
                              >
                                <Icon size={28} />
                              </a>
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex items-center gap-x-2">
                        <LikeButton
                          product={product}
                          isFavorite={isFavorite}
                          setIsFavorite={setIsFavorite}
                        />
                        <span className="text-base capitalize">
                          đã thích ({favoriteCount})
                        </span>
                      </div>
                    </div>
                  ) : (
                    <Skeleton className="h-[20px] w-full" />
                  )}
                </div>
              </div>
              <ShopPreview product={product} />
            </div>
            <div className="flex flex-[80%] flex-col gap-y-6   lg:flex-[66%]">
              <ProductInfo
                product={product}
                reviewCount={reviews.length || 0}
                favoriteCount={favoriteCount}
              />

              <div className="space-y-6 rounded-md bg-white ">
                <ProductDescription product={product} />

                <ReviewList
                  reviews={reviews ?? []}
                  setReviews={setReviews}
                  product={product}
                  starCount={starCount}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full w-full  gap-x-6  rounded-md "></div>
      </div>
    </Container>
  )
}

export default ProductDetail
