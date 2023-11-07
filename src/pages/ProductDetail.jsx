import cartApi from '@/apis/modules/cart.api'
import favoriteApi from '@/apis/modules/favorite.api'
import productApi from '@/apis/modules/product.api'
import DetailImage from '@/components/DetailImage'
import ProductReview from '@/components/ProductReview'
import Star from '@/components/Star'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import {
  addCart,
  addFavorite,
  removeFavorite,
} from '@/redux/features/userSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BiSolidShieldAlt2 } from 'react-icons/bi'
import { BsCartPlus, BsTruck } from 'react-icons/bs'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const cartState = {
  increase: 'increase',
  decrease: 'decrease',
}

const ProductDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cartValue, setCartValue] = useState(1)
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [activeReview, setActiveReview] = useState(0)
  const { listFavorites, user } = useSelector(state => state.user)
  const [isFavorite, setIsFavorite] = useState(false)
  const [onRequest, setOnRequest] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [reviewCount, setReviewCount] = useState(0)
  const [favoriteCount, setFavoriteCount] = useState(0)
  const [filteredReviews, setFilteredReviews] = useState([])
  const [starCount, setStarCount] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const getProduct = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await productApi.getDetail({
        productId,
      })
      dispatch(setGlobalLoading(false))

      if (response) {
        setProduct(response)
        setIsFavorite(response.isFavorite)
        setFilteredReviews(response.reviews)
      }

      if (err) toast.error(err.message)
    }

    getProduct()
  }, [dispatch])

  useEffect(() => {
    const getImage = async () => {
      if (product && product.imageName) {
        const { response, err } = await productApi.getImage({
          imageName: product.imageName,
        })

        if (err) toast.error(err.message)
        if (response) {
          setImageUrl(`data:image/png;base64,${response}`)
        }
      }
    }

    getImage()
  }, [product])

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
    if (product && product.reviews) {
      setFilteredReviews(
        [...product.reviews].filter(review => {
          if (!activeReview) return review.rating
          return +review.rating === activeReview
        })
      )
    }
  }, [activeReview])

  const handleValueCart = state => {
    if (cartState.increase == state) {
      setCartValue(cartValue + 1)
    }
    if (cartState.decrease == state) {
      if (cartValue - 1 < 1) {
        setCartValue(1)
        return
      }
      setCartValue(cartValue - 1)
    }
  }

  const onCartClick = async () => {
    if (!user) {
      toast.error('You must login first!', { toastId: 'warning-login' })
      navigate('/authUser/signin')
      return
    }

    const body = {
      productId: product._id,
      productName: product.name,
      typeId: product.typeId._id,
      cateId: product.cateId._id,
      productPrice: product.price,
      productImage: product.imageName,
      quantity: cartValue,
    }

    const { response, err } = await cartApi.add(body)

    if (err) toast.error(err.message)

    if (response) {
      dispatch(addCart(response))

      toast.success('Add cart success')
    }
  }

  const onFavoriteClick = async () => {
    if (!user) {
      toast.error('You must login first!', { toastId: 'warning-login' })
      navigate('/authUser/signin')
      return
    }
    if (onRequest) return
    if (isFavorite) {
      onRemoveFavorite()
      return
    }

    setOnRequest(true)

    const body = {
      productId: product._id,
      productTitle: product.title || product.name,
      productType: product.type,
      productPrice: product.price,
      productImage: product.imageName,
    }
    const { response, err } = await favoriteApi.add(body)
    if (err) toast.error(err.message)

    setOnRequest(false)

    if (response) {
      dispatch(addFavorite(response))
      setIsFavorite(true)
      toast.success('Add favorite success')
      setFavoriteCount(favoriteCount + 1)
    }
  }

  const onRemoveFavorite = async () => {
    if (onRequest) return

    setOnRequest(true)
    const favorite = listFavorites.find(item => item.productId === product._id)

    const { response, err } = await favoriteApi.remove({
      favoriteId: favorite.id,
    })

    setOnRequest(false)

    if (err) toast.error(err.message)

    if (response) {
      dispatch(removeFavorite({ favoriteId: favorite.id }))
      setIsFavorite(false)
      setFavoriteCount(favoriteCount - 1)
    }
  }

  useEffect(() => {
    if (product && product.reviews) setReviewCount(product.reviews.length)
  }, [product])

  useEffect(() => {
    if (product && product.favorites) {
      setFavoriteCount(product.favorites.length)
    }
  }, [product])

  return (
    <div className="bg-bg_page h-full px-0 py-0 sm:py-[56px]   xl:px-[136px]">
      <div className="mx-auto h-full max-w-[1220px] rounded-md bg-white">
        <div className="flex flex-col sm:flex-row ">
          <div className="flex-[33%] grow-0 p-4">
            <div
              className="m-1.5 w-full bg-cover bg-center pt-[450px]"
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            ></div>

            <div className="scrollbar-hide hidden max-w-[100%] gap-4 overflow-x-scroll md:flex">
              <DetailImage imageUrl={imageUrl} />
              <DetailImage imageUrl={imageUrl} />
              <DetailImage imageUrl={imageUrl} />
              <DetailImage imageUrl={imageUrl} />
            </div>

            <div className="hidden items-center  justify-center p-4 md:flex">
              <h3 className="text-base">Chia sẻ:</h3>
              <div className="border-right-ab relative ml-4 flex gap-4 text-2xl after:right-[-2rem]">
                <button className="text-[#0384ff]">
                  <i className="fa-brands fa-facebook-messenger"></i>
                </button>
                <button className="text-[#3b5999]">
                  <i className="fa-brands fa-facebook"></i>
                </button>
                <button className="text-[#de0217]">
                  <i className="fa-brands fa-pinterest"></i>
                </button>
                <button className="text-[#10c2ff]">
                  <i className="fa-brands fa-twitter"></i>
                </button>
              </div>

              <div
                className="flex cursor-pointer select-none items-center capitalize"
                onClick={onFavoriteClick}
              >
                {!isFavorite ? (
                  <MdOutlineFavoriteBorder
                    className="ml-[4rem] mr-3 text-2xl text-red-600"
                    onClick={() => setIsFavorite(!isFavorite)}
                  />
                ) : (
                  <MdOutlineFavorite
                    className="ml-[4rem] mr-3 text-2xl text-red-600"
                    onClick={() => setIsFavorite(!isFavorite)}
                  />
                )}
                <span className="text-base">đã thích ({favoriteCount})</span>
              </div>
            </div>
          </div>
          <div className="flex-[66%] p-4">
            <div className="flex flex-col gap-10">
              <div className="flex items-center">
                <span className="tag-shopee mt-2 min-w-[66px] self-start bg-primary text-xs text-white sm:text-sm">
                  Yêu thích
                </span>

                <span className="text-base sm:text-xl">
                  {product && product.name}
                </span>
              </div>

              <div className="flex flex-wrap items-center  gap-4">
                <span className="border-right-ab relative flex items-center after:right-[-2rem]">
                  <span className="border-bottom-ab relative mr-2 text-base text-primary  after:bg-primary sm:text-lg">
                    {product && product.rating}
                  </span>

                  <Star
                    stars={product && product.rating}
                    className="text-sm text-yellow-500 sm:text-base"
                  />
                </span>

                <span className="border-right-ab relative ml-[3rem] hidden items-center after:right-[-2rem] sm:flex">
                  <span className="border-bottom-ab  relative mr-2 text-base after:bg-gray-500 sm:text-lg">
                    {reviewCount}
                  </span>
                  <span className="text-sm  text-gray-500">Đánh giá</span>
                </span>

                <span className="ml-[3rem] flex items-center ">
                  <span className="border-bottom-ab  relative mr-2 text-base after:bg-gray-500 sm:text-lg">
                    2,3k
                  </span>
                  <span className="text-sm  text-gray-500">Đã bán</span>
                </span>

                <span className="ml-4 flex items-center gap-8 sm:hidden">
                  <button className="text-3xl text-[#0384ff]">
                    <i className="fa-brands fa-facebook-messenger"></i>
                  </button>
                  <button>
                    <i className="fa-regular fa-heart text-3xl  text-primary"></i>
                  </button>
                </span>
              </div>
            </div>

            <div className="mt-5 hidden bg-[#fafafa] p-6 sm:block">
              <div className="flex flex-wrap gap-4">
                <span className="flex items-start text-base font-normal text-neutral-400 line-through">
                  <span className="mr-1 text-[11px]">₫</span>
                  {product &&
                    product.discountPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </span>

                <span className="flex items-start text-3xl font-normal text-black">
                  <span className="text-lg ">₫</span>
                  {product &&
                    product.discountPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </span>
                {product && product.discount !== '0' && (
                  <div className="flex items-center">
                    <span className="tag-shopee bg-primary py-0  text-xs font-bold uppercase text-white">
                      {product.discount}% giảm
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="h-6 w-6 bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(
                      ${
                        new URL(`../assets/img/logos/sale.png`, import.meta.url)
                          .href
                      }
                    )`,
                  }}
                ></div>

                <div className="flex flex-col flex-wrap items-start justify-center">
                  <div className="flex gap-4">
                    <span className="text-base font-normal text-primary">
                      Gì cũng rẻ
                    </span>
                  </div>

                  <span className="text-sm text-gray-500">
                    Giá tốt nhất so với các sản phẩm cùng loại trên Shop!
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 ">
              <div className="flex gap-4 py-3 capitalize">
                <span className="hidden w-[120px] text-sm text-gray-500 md:block">
                  deal sốc
                </span>
                <span className="tag-shopee bg-[#ffeee8] font-normal text-primary">
                  mua kèm deal sốc
                </span>
              </div>

              <div className="flex flex-wrap gap-4 py-3 text-sm">
                <span className="mt-1 hidden w-[120px] capitalize text-gray-500 md:block">
                  vận chuyển
                </span>
                <span>
                  <div className="flex gap-4 py-2">
                    <div
                      className="h-6 w-6 bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: `url(
                      ${
                        new URL(
                          `@/assets/img/logos/free-ship.png`,
                          import.meta.url
                        ).href
                      }
                    )`,
                      }}
                    ></div>
                    <p className="first-letter:uppercase">
                      miễn phí vận chuyển
                    </p>
                  </div>
                  <div className="flex gap-4 capitalize">
                    <BsTruck className="fa-solid fa-truck mr-1 mt-2 text-xl" />
                    <span className="flex flex-col">
                      <div className="hidden items-center gap-4 py-2 md:flex">
                        <span className="text-gray-500 ">vận chuyển tới</span>
                        <span>
                          phường tràng tiền, quận hoàn kiếm
                          <i className="ti-angle-down ml-2"></i>
                        </span>
                      </div>

                      <div className="flex items-center gap-4 py-2 ">
                        <span className="text-sm text-gray-500">
                          phí vận chuyển
                        </span>
                        <span className="flex">
                          ₫0
                          <span className="ml-2 hidden md:block">
                            <i className="ti-angle-down"></i>
                          </span>
                        </span>
                      </div>
                    </span>
                  </div>
                </span>
              </div>

              <div className="flex flex-col flex-wrap gap-4 py-3 capitalize md:flex-row">
                <span className="w-[120px] text-sm text-gray-500">
                  chọn màu
                </span>
                <span className=" font-normal">
                  <div className="flex-wap flex gap-4">
                    <span className="select-type-btn">trắng</span>
                    <span className="select-type-dis-btn">xám bạc</span>
                    <span className="select-type-btn">đen</span>
                  </div>
                </span>
              </div>

              <div className="mt-4 flex flex-col flex-wrap gap-4 py-3 capitalize md:flex-row">
                <span className="w-[120px] text-sm text-gray-500">
                  số lượng
                </span>
                <span className=" font-normal">
                  <div className="flex items-center gap-4">
                    <span>
                      <span
                        className="cursor-pointer select-none border border-gray-300 px-5 py-1 text-xl text-gray-600"
                        onClick={() => handleValueCart(cartState.decrease)}
                      >
                        -
                      </span>
                      <span className="select-none border border-gray-300 px-7 py-1 text-xl text-gray-600">
                        {cartValue}
                      </span>
                      <span
                        className="cursor-pointer select-none border border-gray-300 px-4 py-1 text-xl
                      text-gray-600"
                        onClick={() => handleValueCart(cartState.increase)}
                      >
                        +
                      </span>
                    </span>
                    <span className="hidden px-6 py-1 text-sm text-gray-500 md:block">
                      322 sảm phẩm có sẵn
                    </span>
                  </div>
                </span>
              </div>

              <div className="mt-8 flex gap-4">
                <Button
                  onClick={onCartClick}
                  className="py-4 text-base uppercase"
                  size="lg"
                  variant="outline"
                >
                  <BsCartPlus className="mr-2" />
                  <span>thêm vào giỏ hàng</span>
                </Button>

                <Button className="py-4 text-base uppercase" size="lg">
                  mua ngay
                </Button>
              </div>

              <div className="mt-[40px] flex items-center gap-4 border-t border-gray-200 p-8 text-sm capitalize">
                <BiSolidShieldAlt2 size={22} color="#cccccc" />
                <span>shop đảm bảo</span>
                <span className="">3 ngày trả hàng / hoàn tiền</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto mt-8  flex h-full max-w-[1220px]">
        <div className="flex-[80%]  md:mr-4">
          <div className="rounded-md bg-white p-10">
            <div className="">
              <div className="w-full rounded-md bg-[#fafafa] px-6 py-5 text-xl uppercase">
                chi tiết sản phẩm
              </div>
              <div className="flex gap-4 px-6 py-5 capitalize">
                <span className="w-[120px] text-sm text-gray-500">
                  danh mục
                </span>
                <span className="text-sm">
                  <Link to={`/`} className="font-normal text-blue-600">
                    shopee
                  </Link>
                  {' > '}

                  {product && (
                    <Link
                      to={`/products/${product.cateId.name}/Tất cả sản phẩm`}
                      className="font-normal text-blue-600"
                    >
                      {product.cateId.name}
                    </Link>
                  )}
                  {' > '}
                  {product && (
                    <Link
                      to={`/products/${product.cateId.name}/${product.typeId.name}`}
                      className="font-normal text-blue-600"
                    >
                      {product.typeId.name}
                    </Link>
                  )}
                </span>
              </div>

              <div className="flex gap-4 px-6 py-5 capitalize">
                <span className="w-[120px] text-sm text-gray-500">
                  kho hàng
                </span>
                <span className=" text-sm font-normal text-gray-600">6454</span>
              </div>

              <div className="flex gap-4 px-6 py-5 capitalize">
                <span className="w-[120px] text-sm text-gray-500">gửi từ</span>
                <span className=" text-sm font-normal text-gray-600">
                  Hà Nội
                </span>
              </div>
            </div>

            <div className="mt-8">
              <div className="w-full rounded-md bg-[#fafafa] px-6 py-5 text-xl uppercase">
                mô tả sản phẩm
              </div>

              <div className="flex gap-4 px-6 py-5 capitalize">
                <div
                  dangerouslySetInnerHTML={{
                    __html: product && product.info,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-md bg-white p-10">
            <div className="">
              <div className="w-full rounded-md bg-white text-xl uppercase">
                đánh giá sản phẩm
              </div>
              <div className="mt-8  hidden gap-4 bg-[#fafafa] p-[20px] capitalize md:block">
                <div className="flex flex-col items-center justify-center p-8">
                  <span className="text-[28px] text-primary">
                    {product && product.rating}
                    <span className="ml-1 text-lg">trên 5</span>
                  </span>

                  <Star
                    stars={product && product.rating}
                    className="text-lg text-yellow-500"
                  />
                </div>

                <div className="hidden flex-wrap items-center justify-start   gap-3 p-8 md:flex">
                  <Button
                    variant="outline"
                    className={cn(
                      `border-accent capitalize text-accent-foreground`,
                      activeReview === 0 ? 'border-primary text-primary' : ''
                    )}
                    key={0}
                    onClick={() => setActiveReview(0)}
                  >
                    tất cả
                  </Button>
                  {starCount.map((star, index) => {
                    if (index) {
                      return (
                        <Button
                          variant="outline"
                          className={cn(
                            `border-accent text-accent-foreground`,
                            activeReview === index
                              ? 'border-primary text-primary'
                              : ''
                          )}
                          key={index}
                          onClick={() => setActiveReview(index)}
                        >
                          {`${index} sao (${star})`}
                        </Button>
                      )
                    }
                  })}
                </div>
              </div>
              <ProductReview
                reviews={filteredReviews ? filteredReviews : []}
                product={product}
                setReviewCount={setReviewCount}
                reviewCount={reviewCount}
              />
            </div>
          </div>
        </div>
        <div className="ml-4 hidden h-full  flex-[20%] rounded-md bg-white px-6 py-8 md:block">
          <div>
            <span className="w-[120px] text-sm text-gray-500 ">
              Mã giảm giá của shop
            </span>

            <div className="px-2 py-4">
              <span className="flex flex-wrap items-center justify-center gap-4 rounded-sm bg-[#fafafa] px-2 py-4">
                <div>
                  <div className="mb-4 font-medium capitalize text-primary">
                    <div className="text-sm">giảm 10%</div>
                    <div className="text-xs">đơn tối thiểu 69k</div>
                  </div>

                  <div className="text-gray-500">HSD 04.06.2023</div>
                </div>

                <div className="flex items-center">
                  <Button className="px-6" size="sm">
                    Lưu
                  </Button>
                </div>
              </span>
            </div>
          </div>

          <div>
            <div className="px-2 py-4">
              <span className="flex flex-wrap items-center justify-center gap-4 rounded-sm bg-[#fafafa] px-2 py-4">
                <div>
                  <div className="mb-4 font-medium capitalize text-primary">
                    <div className="text-sm">giảm 15%</div>
                    <div className="text-xs">đơn tối thiểu 150k</div>
                  </div>

                  <div className="text-gray-500">HSD 04.08.2023</div>
                </div>

                <div className="flex items-center">
                  <Button className="px-6" size="sm">
                    Lưu
                  </Button>
                </div>
              </span>
            </div>
          </div>

          <div>
            <div className="px-2 py-4">
              <span className="flex flex-wrap items-center justify-center gap-4 rounded-sm bg-[#fafafa] px-2 py-4">
                <div>
                  <div className="mb-4 font-medium capitalize text-primary">
                    <div className="text-sm">giảm 20%</div>
                    <div className="text-xs">đơn tối thiểu 299k</div>
                  </div>

                  <div className="text-gray-500">HSD 15.08.2023</div>
                </div>

                <div className="flex items-center">
                  <Button className="px-6" size="sm">
                    Lưu
                  </Button>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
