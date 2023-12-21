import productApi from '@/apis/modules/product.api'
import LikeButton from '@/components/LikeButton'
import ProductDescription from '@/components/ProductDescription'
import ProductInfo from '@/components/ProductInfo'
import ReviewImages from '@/components/ReviewImages'
import ReviewList from '@/components/ReviewList'
import ShopPreview from '@/components/ShopPreview'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { socialNetworkLinks } from '@/utilities/constants'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const [product, setProduct] = useState(null)

  const [favoriteCount, setFavoriteCount] = useState(0)
  const [reviews, setReviews] = useState([])
  const [starCount, setStarCount] = useState([])

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
    <div className="bg-bg_page  h-full space-y-6 px-0 py-0 sm:py-[56px]   xl:px-[136px]">
      <div className="mx-auto h-full max-w-[1280px] space-y-6 bg-accent">
        <div className="h-full w-full  rounded-md bg-white">
          <div className="flex flex-col gap-x-6  bg-accent md:flex-row">
            <div className=" flex flex-[20%] flex-col gap-y-6 bg-accent lg:flex-[33%]">
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
                        <LikeButton product={product} />
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
            <div className="flex-[80%] rounded-md bg-white p-4 lg:flex-[66%]">
              <ProductInfo
                product={product}
                reviewCount={reviews.length || 0}
                favoriteCount={favoriteCount}
              />
            </div>
          </div>
        </div>

        <div className="flex h-full w-full  gap-x-6  rounded-md bg-accent ">
          <div className="flex-[80%]  space-y-6  bg-accent">
            <ProductDescription product={product} />

            <ReviewList
              reviews={reviews ?? []}
              setReviews={setReviews}
              product={product}
              starCount={starCount}
            />
          </div>
          {product ? (
            <div className=" hidden h-full  flex-[20%] rounded-md bg-white px-6 py-8 md:block">
              <span className="w-[120px] text-sm text-gray-500 ">
                Mã giảm giá của shop
              </span>

              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="px-2 py-4">
                    <span className="flex flex-wrap items-center justify-center gap-4 rounded-sm bg-[#fafafa] px-2 py-4">
                      <div>
                        <div className="mb-4 font-medium capitalize text-primary">
                          <div className="text-center text-sm">giảm 10%</div>
                          <div className="text-xs">đơn tối thiểu 69k</div>
                        </div>

                        <div className="text-sm text-gray-500">
                          HSD 04.06.2023
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Button className="px-6" size="sm">
                          Lưu
                        </Button>
                      </div>
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex-[20%]"></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
